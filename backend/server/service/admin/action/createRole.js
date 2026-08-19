const grpc = require("@grpc/grpc-js");
const sequelize = require("../../../db/connection");
const { QueryTypes } = require("sequelize");
const { checkFilterExists, verifyLoggedInUserId } = require("./adminUtils");

const CreateRole = async (call, callback) => {
  try {
    const { adminId, volumeFilterId, amountFilterId, daysFilterId, roleName } =
      call.request;
    const loggedInUserId = call.metadata.get("loggedInAdminId")[0];

    if (!volumeFilterId || !amountFilterId || !daysFilterId) {
      throw {
        details: `Please select filters for amount, volume and days`,
        code: grpc.status.INVALID_ARGUMENT,
      };
    }
    if (!roleName) {
      throw {
        details: "Please provide role name",
        code: grpc.status.INVALID_ARGUMENT,
      };
    }

    verifyLoggedInUserId(adminId, loggedInUserId);

    const checkRoleExists = await sequelize.query(
      "SELECT roleName from roles WHERE roleName=:roleName",
      {
        raw: true,
        replacements: {
          roleName,
        },
        type: QueryTypes.SELECT,
      }
    );
    await Promise.all([
      checkFilterExists(volumeFilterId),
      checkFilterExists(amountFilterId),
      checkFilterExists(daysFilterId),
    ]);

    if (checkRoleExists.length === 1) {
      throw {
        details: "The role you are trying to add already exists",
        code: grpc.status.ALREADY_EXISTS,
      };
    }

    const [_, createNewRole] = await sequelize.query(
      "INSERT INTO roles (roleName) VALUES (:roleName)",
      {
        raw: true,
        replacements: {
          roleName,
        },
      }
    );

    if (createNewRole === 1) {
      const roleData = await sequelize.query(
        "SELECT id,roleName from roles WHERE roleName=:roleName",
        {
          raw: true,
          type: QueryTypes.SELECT,
          replacements: {
            roleName,
          },
        }
      );

      const [__, addRoleFilters] = await sequelize.query(
        "INSERT INTO role_filters (roleId,filterId) VALUES (:id,:volumeFilterId),(:id,:amountFilterId),(:id,:daysFilterId)",
        {
          raw: true,
          replacements: {
            id: roleData[0].id,
            volumeFilterId,
            amountFilterId,
            daysFilterId,
          },
        }
      );

      if (addRoleFilters === 3) {
        return callback(null, {
          message: `Role created successfully`,
          success: true,
        });
      } else {
        throw new Error("Error while inserting to role filter");
      }
    } else {
      throw new Error("Failed to add role");
    }
  } catch (error) {
    console.log(error);
    return callback({
      details: error.details || "Failed to create role",
      code: error.code || grpc.status.INTERNAL,
    });
  }
};

module.exports = CreateRole;
