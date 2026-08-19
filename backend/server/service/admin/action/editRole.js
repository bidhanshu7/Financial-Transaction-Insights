const grpc = require("@grpc/grpc-js");
const {
  verifyLoggedInUserId,
  checkFilterExists,
  checkHasFilterIdChanged,
  checkNewFilter,
  updateFilters,
} = require("./adminUtils");
const sequelize = require("../../../db/connection");
const { QueryTypes, Sequelize } = require("sequelize");

const EditRole = async (call, callback) => {
  const { roleId, adminId, filters, roleName } = call.request;
  const loggedInUserId = call.metadata.get("loggedInAdminId")[0];

  const transaction = await sequelize.transaction();
  console.log(filters);
  try {
    if (!roleId) {
      throw {
        details: "Role id not provided",
        code: grpc.status.INVALID_ARGUMENT,
      };
    }
    verifyLoggedInUserId(adminId, loggedInUserId);

    const roleIdExists = await sequelize.query(
      "SELECT id,roleName from roles WHERE id=:roleId",
      {
        raw: true,
        replacements: {
          roleId,
        },
        type: QueryTypes.SELECT,
        transaction,
      }
    );

    if (roleIdExists.length === 0) {
      throw {
        details: "Resource not found",
        code: grpc.status.NOT_FOUND,
      };
    }

    if (roleIdExists[0].roleName !== roleName) {
      const [_, changeRoleResult] = await sequelize.query(
        "UPDATE roles SET roleName=:roleName WHERE id=:id",
        {
          replacements: {
            id: roleId,
            roleName,
          },
          transaction: true,
        }
      );
      if (changeRoleResult.affectedRows !== 1) {
        throw {
          details: `Failed to update the role name`,
          code: grpc.status.FAILED_PRECONDITION,
        };
      }
    }

    const filterIds = Object.values(filters);

    if (filterIds.length === 0) {
      throw {
        details: "Filter ids not provided",
        code: grpc.status.INVALID_ARGUMENT,
      };
    }

    await Promise.all(filterIds.map((id) => checkFilterExists(id)));

    const query = `SELECT d.id as id, c.filterid as filterTypeId, e.filterName as filterName , 
                        d.filtervalue as filterValue
                        FROM role_filters as c
                        JOIN filters as d
                        ON c.filterId = d.Id
                        JOIN filter_types as e
                        ON d.filterTypeId = e.filterTypeId
                        WHERE c.roleId = :roleId`;

    const roleDetails = await sequelize.query(query, {
      raw: true,
      replacements: {
        roleId,
      },
      type: QueryTypes.SELECT,
    });

    const filterChangeState = checkHasFilterIdChanged(
      filters,
      roleDetails,
      roleId
    );

    if (filterChangeState.length === 0) {
      throw {
        details: "No new filters to update",
        code: grpc.status.CANCELLED,
      };
    }
    console.log(filterChangeState);
    await Promise.all(
      filterChangeState.map((filter) => updateFilters(filter, transaction))
    );

    const newFilter = checkNewFilter(filters, roleDetails);

    if (newFilter.length > 0) {
      const newFilterQuery = newFilter
        .map((filterName) => {
          return `(:id,:${filterName})`;
        })
        .join(" ,");

      await sequelize.query(
        `INSERT INTO role_filters (roleId,filterId) VALUES ${newFilterQuery}`,
        {
          raw: true,
          replacements: filters,
          transaction,
        }
      );
    }

    await transaction.commit();
    return callback(null, {
      message: "Edited role details successful",
      success: false,
    });
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return callback({
      details: error.details || "Failed to edit the role data",
      code: error.code || grpc.status.INTERNAL,
    });
  }
};

module.exports = EditRole;
