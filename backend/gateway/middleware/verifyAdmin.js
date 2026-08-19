const verifyAdmin = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;

    if (!isAdmin) {
      return next({
        status: 401,
        message: "Unauthorized",
        extraDetails: "This action is  not allowed to the user",
      });
    } else {
      next();
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = verifyAdmin;
