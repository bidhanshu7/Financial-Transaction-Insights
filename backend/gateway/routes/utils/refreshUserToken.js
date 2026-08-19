const jwt = require("jsonwebtoken");

const refreshUserToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return next({
        code: 401,
        message: "Token not found",
        extraDetails: "Unauthorized",
      });
    }

    jwt.verify(refreshToken, process.env.JWTPRIVATEKEY, (error, data) => {
      if (error) {
        if (error instanceof jwt.TokenExpiredError) {
          return next({
            code: 401,
            message: "Refresh Token expired",
          });
        }
      } else {
        const { exp, iat, ...payload } = data;

        const accessToken = jwt.sign(payload, process.env.JWTPRIVATEKEY, {
          expiresIn: "1hr",
        });

        return res.status(200).json({
          token: accessToken,
        });
      }
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = refreshUserToken;
