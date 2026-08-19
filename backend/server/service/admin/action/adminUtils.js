const grpc = require("@grpc/grpc-js");
const sequelize = require("../../../db/connection");
const { QueryTypes } = require("sequelize");

const verifyLoggedInUserId = (id, loggedInId) => {
  if (id !== loggedInId) {
    throw {
      details: "Access denied",
      code: grpc.status.PERMISSION_DENIED,
    };
  }
};

const checkFilterExists = async (id) => {
  try {
    const result = await sequelize.query(
      "SELECT 1 FROM filters WHERE id = :id LIMIT 1",
      {
        raw: true,
        type: QueryTypes.SELECT,
        replacements: {
          id,
        },
      }
    );

    if (!result || result.length === 0) {
      throw {
        details: "The filter you are trying to add does not exist",
        code: grpc.status.NOT_FOUND,
      };
    }
  } catch (error) {
    throw error;
  }
};

const updateFilters = async (filter, transaction) => {
  try {
    console.log(filter);
    const [_, result] = await sequelize.query(
      "UPDATE role_filters SET filterId=:newFilterId WHERE filterId=:id and roleId=:roleId",
      {
        raw: true,
        replacements: filter,
        transaction,
      }
    );

    if (result.affectedRows !== 1) {
      throw {
        details: `Failed to update the filter for ${filter.filterName}`,
        code: grpc.status.FAILED_PRECONDITION,
      };
    }
  } catch (error) {
    throw error;
  }
};
const checkHasFilterIdChanged = (filters, roleDetails, roleId) => {
  const filterDifference = roleDetails
    .map((filter) => {
      if (filters.hasOwnProperty(filter.filterName)) {
        return {
          id: filter.id,
          filterName: filter.filterName,
          hasChanged: filter.id !== filters[filter.filterName],
          newFilterId: filters[filter.filterName],
          roleId: roleId,
        };
      } else {
        return filter;
      }
    })
    .filter((filter) => filter.hasChanged === true);
  return filterDifference;
};

const checkNewFilter = (filters, roleDetails) => {
  return Object.keys(filters).filter((key) => {
    return !roleDetails.some((filter) => filter.filterName === key);
  });
};

module.exports = {
  verifyLoggedInUserId,
  checkFilterExists,
  updateFilters,
  checkHasFilterIdChanged,
  checkNewFilter,
};
