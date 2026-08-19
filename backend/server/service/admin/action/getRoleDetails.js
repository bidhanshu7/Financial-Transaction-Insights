const grpc = require("@grpc/grpc-js");
const sequelize = require("../../../db/connection");

const GetRoleDetails = async (call, callback) => {
  const { roleId } = call.request;

  const query = `SELECT d.id as id, e.filterTypeId as filterTypeId, e.filterName as filterName , 
                d.filtervalue as filterValue
                FROM role_filters as c
                JOIN filters as d
                ON c.filterId = d.Id
                JOIN filter_types as e
                ON d.filterTypeId = e.filterTypeId
                WHERE c.roleId = :roleId`;

  try {
    const [[role], extra] = await sequelize.query(
      `SELECT id, roleName FROM roles WHERE id = :roleId`,
      {
        raw: true,
        replacements: { roleId },
      }
    );

    if (!role) {
      console.log("Role not available");
      return callback({
        details: "No User Role found",
        code: grpc.status.NOT_FOUND,
      });
    }

    const [filters] = await sequelize.query(query, {
      raw: true,
      replacements: { roleId },
    });

    if (!filters || filters.length === 0) {
      console.log("No filters found for role");
      return callback({
        details: "No filters found for this role",
        code: grpc.status.NOT_FOUND,
      });
    }

    return callback(null, { role, filters });
  } catch (err) {
    console.error(err);
    return callback({
      details: err.details || "Failed to fetch the User Role",
      code: grpc.status.INTERNAL,
    });
  }
};

module.exports = { GetRoleDetails };
