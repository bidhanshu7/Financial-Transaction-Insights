const grpc = require("@grpc/grpc-js");
const protoloader = require("@grpc/proto-loader");
const path = require("path");

const transactionfilePath = path.resolve(
  __dirname,
  "../../proto/transaction.proto"
);

const packageDefinations = protoloader.loadSync(transactionfilePath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const transactionProto = grpc.loadPackageDefinition(packageDefinations);

const TransactionService =
  transactionProto.transaction.TransactionService;

const transactionClient = new TransactionService(
  process.env.TRANSACTION_HOST_URL || "server:50051",
  grpc.credentials.createInsecure()
);


module.exports = transactionClient;
