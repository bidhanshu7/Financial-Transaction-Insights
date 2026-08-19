const grpc = require("@grpc/grpc-js");
const sequelize = require("../../../db/connection");

const GetProfileDetails = async (call, callback) => {
  try {
    const { adminId } = call.request;

    const loggedInAdminId = call.metadata.get("loggedInAdminId")[0];

    if (adminId !== loggedInAdminId) {
      throw {
        details: "This action is not allowed",
        code: grpc.status.UNAUTHENTICATED,
      };
    }

    const [adminDetails] = await sequelize.query(
      "SELECT id,username,email  FROM admins WHERE id=:id",
      {
        raw: true,
        replacements: {
          id: loggedInAdminId,
        },
      }
    );


    return callback(null, {
      admin:adminDetails[0],
      message: "Admin details fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return callback({
      details: error.details || "Failed to get admin details",
      code: grpc.status.INTERNAL,
    });
  }
};

module.exports = GetProfileDetails;
