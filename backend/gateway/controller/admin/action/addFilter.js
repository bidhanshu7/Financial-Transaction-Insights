const adminActionClient = require("../../../grpcClients/adminActionClient");
const createLoggedInMetaData = require("./adminUtils");

const addFilter = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { filterTypeId } = req.params;
    const { filterValue } = req.body;
    const metadata = createLoggedInMetaData(id);

    adminActionClient.AddFilter(
      { adminId: id, filterTypeId, filterValue },
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

module.exports = addFilter;
