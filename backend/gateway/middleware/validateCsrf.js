const csrf = require('csrf');
const csrfProtection = csrf();

const validateCsrf = async (req, resp, next) => {
  try {
    const csrfTokenFromCookie = req.cookies.csrfToken;

    if (!req.headers.csrf_token) {
      return next({
        status: 401,
        message: "Unauthorized",
        extraDetails: "CSRF verification Failed",
      });
    }
    const secret= process.env.CSRF_SECRET;
    const headerToken = req.headers.csrf_token;
    const isValid = csrfProtection.verify(secret, csrfTokenFromCookie, headerToken);

    if (isValid) {
      return next();
    } else {
        return next({
            status: 403,
            message: "Unauthorized",
            extraDetails: "CSRF Token mismatch",
          });
    }
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = { validateCsrf };
