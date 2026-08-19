const sequelize = require("../db/connection");
const path = require("path");
const Excel = require("exceljs");
const { Transaction } = require("../db/models/index");
const { trace } = require("console");
const transaction = require("../db/models/transaction");

const LoadDataFromExcelFile = async () => {
  try {
    const filePath = path.resolve(__dirname, "testdata.xlsx");

    const exceljs = new Excel.Workbook();
    const workBook = await exceljs.xlsx.readFile(filePath);

    let rowData = [];
    workBook.eachSheet((workSheet, id) => {
      workSheet.eachRow((row, num) => {
        if (num > 1) {
          rowData.push([...row.values.slice(1)]);
        }
      });
    });

    return [...rowData];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const BulkInsertInBatches = async (batch, batchNumber) => {
  const transactions = await sequelize.transaction();
  try {
    console.log(`Inserting for batch number ${batchNumber}`);
    await Transaction.bulkCreate(batch, {
      transaction: transactions,
    });

    await transactions.commit();
  } catch (error) {
    await transactions.rollback();
    throw error;
  }
};

const MigrateDataToDataBase = async () => {
  try {
    const excelData = await LoadDataFromExcelFile();
    const headers = [
      "totalTxnSum",
      "totalTxn",
      "totalAmount",
      "productCode",
      "productName",
      "featureCode",
      "featureName",
      "channel",
      "status",
      "date",
    ];

    const structuredData = excelData.reduce((acc, row, index) => {
      let newData = {};
      row.map((r, i) => {
        if (headers[i] === "date") {
          let newDate = r.replace(/(\d+)(st|nd|rd|th)/, "$1");
          newData[headers[i]] = new Date(newDate);

        } else {
          newData[headers[i]] = r;
        }
      });

      acc.push(newData);

      return acc;
    }, []);

    console.log(structuredData[0]);
    for (let i = 0; i < structuredData.length; i += 100) {
      await BulkInsertInBatches(structuredData.slice(i, i + 100), i);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

MigrateDataToDataBase();
