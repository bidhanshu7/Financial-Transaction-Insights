const userClient = require("../../../grpcClients/userClient");

const UpdateUser = async (req, res, next) => {
  const { username, email, password, roleId } = req.body;
  const { userId } = req.params;
  try {
    userClient.UpdateUser(
      { username, email, password, roleId, userId },
      (err, response) => {
        if (err) {
          console.log(err);
          return next(err);
        }

        return res.status(200).json(response);
      }
    );
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = { UpdateUser };
