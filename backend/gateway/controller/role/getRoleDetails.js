const adminActionClient = require("../../grpcClients/adminActionClient");

const getRoleDetails = async (req, res, next) => {
  try {
    const { roleId } = req.params;

    adminActionClient.GetRoleDetails({ roleId }, (error, response) => {
      if (error) {
        return next(error);
      }

      return res.status(200).json(response);
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = getRoleDetails;
