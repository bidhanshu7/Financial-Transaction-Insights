const TRANSACTION_HOST_URL =
  process.env.TRANSACTION_HOST_URL || "server:50051";
const USER_HOST_URL = process.env.USER_HOST_URL || "server:50052";
const ADMIN_HOST_URL = process.env.ADMIN_HOST_URL || "server:50053";
const PROTO_LOADER_OPTIONS = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const TRANSACTION_PROTO_PATH = "../proto/transaction.proto";

//Proto path for user
const USER_PROTO_PATH = "../proto/user.proto";

//Admin proto paths
const ADMIN_AUTH_PROTO_PATH = "../proto/admin.auth.proto";
const ADMIN_ACTION_PROTO_PATH = "../proto/admin.action.proto";

module.exports = {
  TRANSACTION_HOST_URL,
  USER_HOST_URL,
  PROTO_LOADER_OPTIONS,
  TRANSACTION_PROTO_PATH,
  ADMIN_ACTION_PROTO_PATH,
  ADMIN_AUTH_PROTO_PATH,
  USER_PROTO_PATH,
  ADMIN_HOST_URL,
};
