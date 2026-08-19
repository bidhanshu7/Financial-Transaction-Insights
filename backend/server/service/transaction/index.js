const grpc = require("@grpc/grpc-js");
const protoloader = require("@grpc/proto-loader");
const path = require("path");

const {
  PROTO_LOADER_OPTIONS,
  TRANSACTION_HOST_URL,
  TRANSACTION_PROTO_PATH,
} = require("../../config/protoConfig");
const GetTransactionCountByStatus = require("./getTransactionCountByStatus");
 const GetTransactions = require("./getTransaction");
const GetTransactionCountByChannel = require("./getTransactionCountByChannel");



const transactionProtoPath = path.resolve(TRANSACTION_PROTO_PATH);

//Loading package definations from proto file
const packageDefinations = protoloader.loadSync(
  [transactionProtoPath],
  PROTO_LOADER_OPTIONS
);

const proto = grpc.loadPackageDefinition(packageDefinations);

const transactionService = proto.transaction.TransactionService.service;

const server = new grpc.Server();


server.addService(transactionService, {
 GetTransactionCountByStatus:GetTransactionCountByStatus, 
  GetTransactions,
  GetTransactionCountByChannel
});
const startTransactionServer = () => {
  server.bindAsync(
    TRANSACTION_HOST_URL,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.log("Failed to connect to grpc server: ", err.cause);
      } else {
        console.log(`Grpc Server listening at port: ${port}`);
      }
    }
  );
};

module.exports = startTransactionServer;
