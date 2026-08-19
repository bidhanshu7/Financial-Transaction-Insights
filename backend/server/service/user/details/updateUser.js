const grpc = require("@grpc/grpc-js");
const sequelize = require("../../../db/connection");

const UpdateUser = async (call, callback) => {
  const { user, userId } = call.request;

  const fieldsToUpdate = Object.keys(user)
    .filter((field) => {
      if (
        field === "userType" ||
        field === "email" ||
        field === "isApproved" ||
        field === "isBlocked" ||
        field === "id"
      ) {
        return false;
      } else if (user[field]) {
        return true;
      }
      return false;
    })
    .map((field) => `${field}=:${field}`);

  try {
    if (fieldsToUpdate.length === 0) {
      throw {
        details: "No valid fields to update",
        code: grpc.status.INVALID_ARGUMENT,
      };
    }

    const setQuery = fieldsToUpdate.join(", ");

    const loggedInUserId = call.metadata.get("loggedInUserId")[0];

    if (loggedInUserId !== userId) {
      throw {
        details: "Unauthorized access is being found",
        code: grpc.status.UNAUTHENTICATED,
      };
    }

    const [_, updateResult] = await sequelize.query(
      `UPDATE TABLE users SET ${setQuery} WHERE id=:id`,
      {
        replacements: {
          ...user,
          id: userId,
        },
      }
    );

    if (updateResult === 1) {
      return callback(null, {
        message: "User updated successfully",
        success: true,
      });
    } else {
      return callback(null, {
        message: "No changes were made",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return callback({
      details: error.details || "Failed to update details",
      code: grpc.status.INTERNAL,
    });
  }
};

module.exports = UpdateUser;
