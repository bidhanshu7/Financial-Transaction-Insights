const grpc = require("@grpc/grpc-js");
const { verifyLoggedInUserId } = require("./adminUtils");
const sequelize = require("../../../db/connection");
const { QueryTypes } = require("sequelize");

const GetAllUsers = async (call, callback) => {
  try {
    const { adminId, roleId } = call.request;
    const loggedInAdminId = call.metadata.get("loggedInAdminId")[0];

    verifyLoggedInUserId(adminId, loggedInAdminId);

    const userData = await sequelize.query(
      `SELECT distinct u.id as id,u.username as username,u.email as email,u.roleId as roleId,r.roleName as roleName,createdBy  FROM users u JOIN roles r ON u.roleId=r.id WHERE u.createdBy= :adminId ${
        roleId ? " and u.roleId= :roleId" : ""
      }`,
      {
        raw: true,
        type: QueryTypes.SELECT,
        replacements: {
          adminId,
          roleId,
        },
      }
    );

    if (userData.length === 0) {
      throw {
        details: "Users data not found",
        code: grpc.status.NOT_FOUND,
      };
    }
    console.log(userData);

    return callback(null, {
      users: userData,
    });
  } catch (error) {
    console.log(error);
    return callback({
      details: error.details || "Failed to fetch the users data",
      code: error.code || grpc.status.INTERNAL,
    });
  }
};

module.exports = GetAllUsers;
