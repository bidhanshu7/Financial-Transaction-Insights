const grpc = require("@grpc/grpc-js");
const sequelize = require("../../../db/connection");
const { QueryTypes } = require("sequelize");

const AddFilterType = async (call, callback) => {
  try {
    const { filterName } = call.request;

    if (!filterName) {
      throw {
        details: "Please provide filter name",
        code: grpc.status.INVALID_ARGUMENT,
      };
    }
    const checkFilterTypeExists = await sequelize.query(
      "SELECT filterName from filter_types WHERE filterName=:filterName",
      {
        raw: true,
        replacements: {
          filterName: filterName,
        },
        type: QueryTypes.SELECT,
      }
    );

    if (checkFilterTypeExists.length === 1) {
      throw {
        details: `Filter type ${filterType.filterName} already exists`,
        code: grpc.status.ALREADY_EXISTS,
      };
    }

    const [_, addFilterTypeResult] = await sequelize.query(
      "INSERT INTO filter_types (filterName) VALUES (:filterName)",
      {
        raw: true,
        replacements: {
          filterName: filterName,
        },
      }
    );

    if (addFilterTypeResult === 1) {
      return callback(null, {
        message: "Filter type added successfully",
        success: true,
      });
    }
  } catch (error) {
    return callback({
      details: error.details || "Failed to add filter type",
      code: error.code || grpc.status.INTERNAL,
    });
  }
};

module.exports = AddFilterType;
