const adminActionClient = require("../../../grpcClients/adminActionClient");

const getFilterByType = async (req, res, next) => {
  try {
    const { filterTypeId } = req.params;

    adminActionClient.GetFilterByFilterType(
      { filterTypeId },
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

module.exports = getFilterByType;
