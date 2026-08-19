const adminActionClient = require("../../../grpcClients/adminActionClient");
const createLoggedInMetaData = require("./adminUtils");


const addFilterType = async (req, res, next) => {
  try {
    const { id } = req.user;

    const { filterName } = req.body;
    const metadata = createLoggedInMetaData(id);

    adminActionClient.AddFilter({ filterName }, metadata, (error, response) => {
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

module.exports = addFilterType;
