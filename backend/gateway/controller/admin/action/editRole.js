const grpc = require("@grpc/grpc-js");
const adminActionClient = require("../../../grpcClients/adminActionClient");
const createLoggedInMetaData = require("./adminUtils");

async function EditRole(req, resp, next) {
  const { adminId, filters, roleName } = req.body;
  const { roleId } = req.params;

  const metadata = createLoggedInMetaData(adminId);
  try {
    adminActionClient.EditRole(
      { roleId, adminId, filters, roleName },
      metadata,
      (error, response) => {
        if (error) {
          console.log(error);
          return next(error);
        }

        return resp.status(200).json(response);
      }
    );
  } catch (err) {
    console.log(err);
    return next(err);
  }
}

module.exports = { EditRole };
