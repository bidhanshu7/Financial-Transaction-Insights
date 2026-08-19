const adminActionClient = require("../../../grpcClients/adminActionClient");
const createLoggedInMetaData = require("./adminUtils");

const createRole = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { volumeFilterId, amountFilterId, daysFilterId, roleName } = req.body;

    console.log(volumeFilterId, amountFilterId, daysFilterId);
    const metadata = createLoggedInMetaData(id);

    adminActionClient.CreateRole(
      { adminId: id, volumeFilterId, amountFilterId, daysFilterId, roleName },
      metadata,
      (error, response) => {
        if (error) {
          return next(error);
        }

        return res.status(201).json(response);
      }
    );
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = createRole;
