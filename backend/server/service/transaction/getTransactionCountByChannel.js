const grpc = require("@grpc/grpc-js");
const sequelize = require("../../db/connection");

const GetTransactionCountByChannel = async (call, callback) => {
  const { minVolume, maxVolume, minAmount, maxAmount, noOfDays } = call.request;

  const query = `SELECT SUM(totalTxn) AS sumTransaction, channel FROM transactions
                WHERE totalTxn >= :minVolume AND totalTxn <= :maxVolume AND totalAmount >= :minAmount
                AND totalAmount <=:maxAmount AND date BETWEEN DATE_SUB('2025-01-03', INTERVAL :noOfDays DAY) AND '2025-01-03'
                GROUP BY channel;`;
  try {
    const [channel, _] = await sequelize.query(query, {
      raw: true,
      replacements: {
        minVolume,
        maxVolume,
        minAmount,
        maxAmount,
        noOfDays,
      },
    });
    if (channel.length == 0) {
      throw {
        code: grpc.status.NOT_FOUND,
        details: "Data is not avilable",
      };
    }
    console.log(channel);
    callback(null, {
      channel,
    });
  } catch (err) {
    console.log(err);
    callback({
      details: err.details || "Error occured while fetcing the data",
      code: grpc.status.INTERNAL,
    });
  }
};

module.exports = GetTransactionCountByChannel;
