const grpc = require("@grpc/grpc-js");
const sequelize = require("../../../db/connection");
const { QueryTypes } = require("sequelize");

const GetFilterByFilterType = async (call, callback) => {
  try {
    const { filterTypeId } = call.request;

    if (!filterTypeId) {
      throw {
        details: "Filter Id not provided",
        code: grpc.status.INVALID_ARGUMENT,
      };
    }

    const filtersData = await sequelize.query(
      "SELECT f.id,f.filterTypeId,f.filterValue,ft.filterName FROM filters f JOIN filter_types ft ON f.filterTypeId = ft.filterTypeId WHERE f.filterTypeId = :filterTypeId;",
      {
        raw: true,
        type: QueryTypes.SELECT,
        replacements: {
          filterTypeId,
        },
      }
    );

    console.log(filtersData)

    return callback(null, {
      filters: filtersData,
    });
  } catch (error) {
    return callback({
      details: error.details || "Failed to fetch the users data",
      code: error.code || grpc.status.INTERNAL,
    });
  }
};

module.exports = GetFilterByFilterType;
