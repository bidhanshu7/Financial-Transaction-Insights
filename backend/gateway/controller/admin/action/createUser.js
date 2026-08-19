const adminActionClient = require("../../../grpcClients/adminActionClient");
const createLoggedInMetaData = require("./adminUtils");

const createUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const {username, email, password, roleId}= req.body;
    const metadata = createLoggedInMetaData(id);

    adminActionClient.CreateUser({username, email, password, roleId}, metadata, (error, response) => {
      if (error) {
        return next(error);
      }

      return res.status(201).json(response);
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
