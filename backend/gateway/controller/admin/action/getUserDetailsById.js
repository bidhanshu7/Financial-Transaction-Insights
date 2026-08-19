const userClient = require("../../../grpcClients/userClient");

const getUserDetailsById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    userClient.GetAccountDetails({ userId }, (error, response) => {
      if (error) {
        console.log(error);
        return next(error);
      }

      return res.status(200).json(response);
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { getUserDetailsById };
