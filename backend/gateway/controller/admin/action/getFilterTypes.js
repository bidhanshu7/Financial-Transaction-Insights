const adminActionClient = require("../../../grpcClients/adminActionClient");

const getFilterTypes = async (req, res, next) => {
  try {
    adminActionClient.GetFilterType({}, (error, response) => {
      if (error) {
        return next(error);
      }
      return res.status(200).json(response);
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = getFilterTypes;
