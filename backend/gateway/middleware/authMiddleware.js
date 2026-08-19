const jwt = require("jsonwebtoken");

const authMiddleware = async (req, resp, next) => {
  try {
    console.log(req.headers.authorization);
    if (!req.headers?.authorization) {
      return next({
        code: 401,
        message: "Token not found",
        extraDetails: "Unauthenticated",
      });
    }
    const [_, token] = req.headers.authorization.split(" ");
    const refreshToken = req.cookies.refreshToken;
 
    if (!token || !refreshToken) {
      return next({ code: 401, extraDetails: "Token missing" });
    }

    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, data) => {
      if (err) {
        if (err instanceof jwt.JsonWebTokenError) {
          return next({ code: 401, extraDetails: err.message });
        }
        return next({ code: 401, extraDetails: "Failed to decode token" });
      }
      req.user = data;
      next();
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = authMiddleware;
