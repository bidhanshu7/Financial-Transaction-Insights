const grpc = require("@grpc/grpc-js");
const sequelize = require("../../../db/connection");
const { QueryTypes } = require("sequelize");

const GetFilterType = async (call, callback) => {
  try {
    const {} = call.request;

    const filterTypeData = await sequelize.query(
      "SELECT filterTypeId,filterName from filter_types",
      {
        raw: true,
        type: QueryTypes.SELECT,
      }
    );

    if (!filterTypeData) {
      return callback({
        details: "No filter type data found",
        code: grpc.status.NOT_FOUND,
      });
    }

    return callback(null, { filterTypes: filterTypeData });
  } catch (error) {
    console.log(error);
    return callback({
      details: error.details || "Failed to fetch the users data",
      code: error.code || grpc.status.INTERNAL,
    });
  }
};

module.exports = GetFilterType;
