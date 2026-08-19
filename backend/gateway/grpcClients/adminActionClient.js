const grpc = require("@grpc/grpc-js");
const protoloader = require("@grpc/proto-loader");
const path = require("path");

const adminActionPath = path.resolve(
  __dirname,
  "../../proto/admin.action.proto"
);

const packageDefinition = protoloader.loadSync(adminActionPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const adminActionProto = grpc.loadPackageDefinition(packageDefinition);
const adminAction = adminActionProto.admin.action.AdminActionService;
const adminActionClient = new adminAction(
  process.env.ADMIN_HOST_URL || "server:50053",
  grpc.credentials.createInsecure()
);

module.exports = adminActionClient;
