const grpc = require("@grpc/grpc-js");
const protoloader = require("@grpc/proto-loader");
const path = require("path");
require("dotenv").config();
const {
  PROTO_LOADER_OPTIONS,
  ADMIN_HOST_URL,
  ADMIN_AUTH_PROTO_PATH,
  ADMIN_ACTION_PROTO_PATH,
} = require("../../config/protoConfig");
const SignInAdmin = require("./auth/signInAdmin");
const GetProfileDetails = require("./auth/getProfileDetails");
const CreateUser = require("./action/createUser");
const GetAllUsers = require("./action/getAllUsers");
const GetFilterType = require("./action/getFilterType");
const AddFilter = require("./action/addfilter");
const GetFilterByFilterType = require("./action/getFilterByType");
const { GetRoleDetails } = require("./action/getRoleDetails");
const AddFilterType = require("./action/addFilterType");
const CreateRole = require("./action/createRole");
const { GetAllRoles } = require("./action/getAllRoles");
const EditRole = require("./action/editRole");

const adminAuthProtoPath = path.resolve(ADMIN_AUTH_PROTO_PATH);

const adminActionProtoPath = path.resolve(ADMIN_ACTION_PROTO_PATH);

const adminPackageDefinations = protoloader.loadSync(
  [adminActionProtoPath, adminAuthProtoPath],
  PROTO_LOADER_OPTIONS
);

const adminProto = grpc.loadPackageDefinition(adminPackageDefinations);

const adminAuthService = adminProto.admin.auth.AdminService.service;

const adminActionService = adminProto.admin.action.AdminActionService.service;

const server = new grpc.Server();

server.addService(adminAuthService, {
  SignInAdmin,
  GetProfileDetails,
});

server.addService(adminActionService, {
  CreateUser,
  GetAllUsers,
  GetFilterType,
  AddFilterType,
  AddFilter,
  CreateRole,
  GetFilterByFilterType,
  GetRoleDetails,
  GetAllRoles,
  EditRole,
});
const startAdminServer = () => {
  server.bindAsync(
    ADMIN_HOST_URL,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.log("Failed to connect to grpc server: ", error.cause);
      } else {
        console.log(`Admin Server listening at port: ${port}`);
      }
    }
  );
};

module.exports = startAdminServer;
