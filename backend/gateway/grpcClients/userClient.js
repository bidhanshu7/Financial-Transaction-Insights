const grpc = require("@grpc/grpc-js");
const protoloader = require("@grpc/proto-loader");
const path = require("path");

const userPath = path.resolve(__dirname, "../../proto/user.proto");

const packageDefinition = protoloader.loadSync(userPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition);

const userAuth = userProto.user.UserService;
const userClient = new userAuth(
  process.env.USER_HOST_URL || "server:50052",
  grpc.credentials.createInsecure()
);

module.exports = userClient;
