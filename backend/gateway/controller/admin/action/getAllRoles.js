const adminActionClient = require("../../../grpcClients/adminActionClient");

const getAllRoles = (req, resp, next) => {
  try {
    adminActionClient.GetAllRoles({}, (error, response) => {
      if (error) {
        console.log(error);
        return next(error);
      }
      console.log(response);
      return resp.status(200).json(response);
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = { getAllRoles };
