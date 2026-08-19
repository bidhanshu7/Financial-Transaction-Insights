const grpc = require("@grpc/grpc-js");
const protoloader = require("@grpc/proto-loader");
require("dotenv").config();
const path = require("path");
const {
  USER_PROTO_PATH,
  PROTO_LOADER_OPTIONS,
  USER_HOST_URL,
} = require("../../config/protoConfig.js");
const SignInUser = require("./auth/signInUser.js");
const GetAccountDetails = require("./details/getAccountDetails.js");
const { UpdateUser } = require("../admin/action/updateUserDetails.js");

//proto path for user
const userProtoPath = path.resolve(USER_PROTO_PATH);

const userPackageDefinations = protoloader.loadSync(
  userProtoPath,
  PROTO_LOADER_OPTIONS
);

//loaded grpc package definations into object
const userProto = grpc.loadPackageDefinition(userPackageDefinations);

const UserService = userProto.user.UserService.service;

const server = new grpc.Server();

server.addService(UserService, {
  SignInUser,
  GetAccountDetails,
  UpdateUser,
});

const startUserServer = () => {
  server.bindAsync(
    USER_HOST_URL,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.log("Failed to connect to user server: ", error.cause);
      } else {
        console.log(`User server listening at port ${port}`);
      }
    }
  );
};

module.exports = startUserServer;
