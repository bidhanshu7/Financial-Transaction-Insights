const grpc = require("@grpc/grpc-js");
const sequelize = require("../../db/connection");

const GetTransactionCountByStatus = async (call, callback) => {
  const { minVolume, maxVolume, minAmount, maxAmount, noOfDays } = call.request;
  console.log(call.request);
  const query = ` SELECT SUM(totalTxn) AS sumTransaction, status FROM transactions WHERE totalTxn >= :minVolume
  AND totalTxn <= :maxVolume AND totalAmount >= :minAmount AND totalAmount <= :maxAmount AND date BETWEEN 
  DATE_SUB('2025-01-03', INTERVAL :noOfDays DAY) AND '2025-01-03' GROUP BY status`;

  try {
    const [status, _] = await sequelize.query(query, {
      raw: true,
      replacements: {
        minVolume,
        maxVolume,
        minAmount,
        maxAmount,
        noOfDays,
      },
    });
    if (status.length == 0) {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Data not avilable",
      });
    }

    console.log(status);
    callback(null, { status });
  } catch (err) {
    console.log(err);
    callback({
      details: err.details || "Error Occured while fetching data",
      code: grpc.status.INTERNAL,
    });
  }
};

module.exports = GetTransactionCountByStatus;
