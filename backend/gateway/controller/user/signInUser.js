const userClient = require("../../grpcClients/userClient");
const jwt = require("jsonwebtoken");

const signInUser = async (req, res, next) => {
  try {
    userClient.SignInUser(req.body, (error, response) => {
      if (error) {
        console.log(error);
        return next(error);
      }

      if (response.success) {
        const { user } = response;
        const accessToken = jwt.sign(
          {
            id: user.id,
            roleId: user.roleId,
            isAdmin: false,
          },
          process.env.JWTPRIVATEKEY,
          {
            expiresIn: "1hr",
          }
        );
        const refreshToken = jwt.sign(
          {
            id: user.id,
            roleId: user.roleId,
            isAdmin: false,
          },
          process.env.JWTPRIVATEKEY,
          {
            expiresIn: "1d",
          }
        );

        return res
          .cookie("token", accessToken, {
            httpOnly: true,
          })
          .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
          })
          .status(200)
          .json({ ...response, token: accessToken });
      }
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = signInUser;
