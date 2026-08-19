const adminAuthClient = require("../../../grpcClients/adminAuthClient");
const createLoggedInMetaData = require("../action/adminUtils");

const getProfileDetails = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { adminId } = req.params;

    const metadata = createLoggedInMetaData(id);
    adminAuthClient.GetProfileDetails(
      { adminId },
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

module.exports = getProfileDetails;
