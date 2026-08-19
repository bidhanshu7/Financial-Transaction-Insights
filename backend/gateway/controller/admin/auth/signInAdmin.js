const adminAuthClient = require("../../../grpcClients/adminAuthClient");
const jwt = require("jsonwebtoken");

const signInAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    adminAuthClient.SignInAdmin({ email, password }, (error, response) => {
      if (error) {
        return next(error);
      }

      console.log(process.env.JWTPRIVATEKEY);

      if (response.success) {
        const accessToken = jwt.sign(
          {
            id: response.admin.id,
            isAdmin: true,
          },
          process.env.JWTPRIVATEKEY,
          {
            expiresIn: "1hr",
          }
        );
        const refreshToken = jwt.sign(
          {
            id: response.admin.id,
            isAdmin: true,
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
    return next(error);
  }
};

module.exports = signInAdmin;
