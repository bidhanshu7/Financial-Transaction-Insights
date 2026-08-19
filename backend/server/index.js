const sequelize = require("./db/connection");
const startAdminServer = require("./service/admin");
const startTransactionServer = require("./service/transaction");
const startUserServer = require("./service/user");

const runServer = async () => {
  sequelize.authenticate().then(() => {
    startTransactionServer();
    startUserServer();
    startAdminServer();
  });
};

runServer();
