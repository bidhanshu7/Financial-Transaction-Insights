const grpc = require("@grpc/grpc-js");

const createLoggedInMetaData = (id) => {
  const metadata = new grpc.Metadata();

  metadata.add("loggedInAdminId", id);

  return metadata;
};

module.exports = createLoggedInMetaData;
