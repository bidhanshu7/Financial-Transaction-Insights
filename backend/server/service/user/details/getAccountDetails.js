const grpc = require("@grpc/grpc-js");
const sequelize = require("../../../db/connection");

const GetAccountDetails = async (call, callback) => {
  try {
    const { userId } = call.request;

    // const loggedInUserId = call.metadata.get("loggedInUserId")[0];

    // if (userId !== loggedInUserId) {
    //   throw {
    //     details: "This action is not allowed",
    //     code: grpc.status.UNAUTHENTICATED,
    //   };
    // }

    const [userDetails] = await sequelize.query(
      "SELECT id,username,email,roleId FROM users WHERE id=:id",
      {
        raw: true,
        replacements: {
          id: userId,
        },
      }
    );

    if (userDetails.length === 1) {
      return callback(null, {
        user: userDetails[0],
        message: "User details fetched successfully",
      });
    } else {
      throw {
        details: "User details not found",
        code: grpc.status.NOT_FOUND,
      };
    }
  } catch (error) {
    console.log(error);
    return callback({
      details: error.details || "Failed to get user details",
      code: grpc.status.INTERNAL,
    });
  }
};

module.exports = GetAccountDetails;
