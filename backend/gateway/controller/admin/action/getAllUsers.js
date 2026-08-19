const adminActionClient = require("../../../grpcClients/adminActionClient");
const createLoggedInMetaData = require("./adminUtils");

const getAllUsers = async (req, res, next) => {
  try {
    const { id } = req.user;
    const metadata = createLoggedInMetaData(id);

    adminActionClient.GetAllUsers(
      { adminId: req.params.adminId, roleId: req.query.roleId },
      metadata,
      (error, response) => {
        if (error) {
          return next(error);
        }

        return res.status(200).json(response);
      }
    );
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = getAllUsers;
