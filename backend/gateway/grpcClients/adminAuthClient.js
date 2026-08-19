const grpc = require("@grpc/grpc-js");
const protoloader = require("@grpc/proto-loader");
const path = require("path");

const adminAuthPath = path.resolve(__dirname, "../../proto/admin.auth.proto");

const packageDefinition = protoloader.loadSync(adminAuthPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const adminActionProto = grpc.loadPackageDefinition(packageDefinition);

const adminAuth = adminActionProto.admin.auth.AdminService;
const adminAuthClient = new adminAuth(
  process.env.ADMIN_HOST_URL || "server:50053",
  grpc.credentials.createInsecure()
);

module.exports = adminAuthClient;
