const grpc = require("@grpc/grpc-js");
const sequelize = require("../../db/connection");

const GetTransactions = async (call, callback) => {
  const { minVolume, maxVolume, minAmount, maxAmount, noOfDays, pageNo } =
    call.request;

  console.log(call.request);
  const offset = (pageNo - 1) * 20;

  const query = `
    SELECT id, totalTxnSum, totalTxn, totalAmount, productCode, productName,
           featureCode, featureName, channel, status, date
    FROM transactions
    WHERE totalTxn >= :minVolume
      AND totalTxn <= :maxVolume
      AND totalAmount >= :minAmount
      AND totalAmount <= :maxAmount
      AND date BETWEEN DATE_SUB('2025-01-03', INTERVAL :noOfDays DAY) AND '2025-01-03'
    LIMIT 20 OFFSET :offset
  `;

  try {
    const [transaction] = await sequelize.query(query, {
      raw: true,
      replacements: {
        minVolume,
        maxVolume,
        minAmount,
        maxAmount,
        noOfDays: noOfDays - 1,
        offset,
      },
    });

    callback(null, { transaction });
  } catch (err) {
    console.log(err);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error occurred while fetching the data",
    });
  }
};

module.exports = GetTransactions;
