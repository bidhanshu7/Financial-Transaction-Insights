const grpc = require("@grpc/grpc-js");
const {verifyLoggedInUserId} = require("./adminUtils");
const sequelize = require("../../../db/connection");
const { QueryTypes } = require("sequelize");

const AddFilter = async (call, callback) => {
  try {
    const { filterTypeId, filterValue, adminId } = call.request;

    const loggedInAdminId = call.metadata.get("loggedInAdminId")[0];

    verifyLoggedInUserId(adminId, loggedInAdminId);

    const filterTypeExists = await sequelize.query(
      "SELECT filterTypeId,filterName from filter_types WHERE filterTypeId=:filterTypeId",
      {
        raw: true,
        replacements: {
          filterTypeId,
        },
        type: QueryTypes.SELECT,
      }
    );

    if (filterTypeExists.length === 0) {
      throw {
        details: "Filter type doesnot exists",
        code: grpc.status.NOT_FOUND,
      };
    }

    const filterTypeData = filterTypeExists[0];

    if (
      filterTypeData.filterName === "volume" ||
      filterTypeData.filterName === "amount"
    ) {
      if (!/^\d+-\d+$/.test(filterValue)) {
        throw {
          details: "Please provide range for volume and amount filter",
          code: grpc.status.INVALID_ARGUMENT,
        };
      }
    } else if (filterTypeData.filterName === "days") {
      if (!/^[\d]+$/.test(filterValue)) {
        throw {
          details: "Please provide a digit value for days",
          code: grpc.status.INVALID_ARGUMENT,
        };
      }
    }
    const [checkFilterExists, __] = await sequelize.query(
      "SELECT id from  filters WHERE filterTypeId=:filterTypeId and filterValue=:filterValue",
      {
        raw: true,
        replacements: {
          filterTypeId,
          filterValue,
        },
      }
    );

    if (checkFilterExists.length === 1) {
      throw {
        details: `Filter for ${filterTypeData.filterName} with this value already exists`,
        code: grpc.status.ALREADY_EXISTS,
      };
    }

    const [_, createFilterResult] = await sequelize.query(
      "INSERT INTO filters (filterTypeId,filterValue) VALUES (:filterTypeId,:filterValue)",
      {
        raw: true,
        replacements: {
          filterTypeId,
          filterValue,
        },
      }
    );
    if (createFilterResult === 1) {
      return callback(null, {
        message: "Filter added successfully",
        success: true,
      });
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
    return callback({
      details: error.details || error.message || "Failed to add filter data",
      code: error.code || grpc.status.INTERNAL,
    });
  }
};

module.exports = AddFilter;
