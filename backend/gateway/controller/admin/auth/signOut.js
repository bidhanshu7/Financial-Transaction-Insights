

const signOut = async (req, res, next) => {
  const { isAdmin } = req.user;
  try {
    if (isAdmin) {
      return res
        .clearCookie("token")
        .clearCookie("refreshToken")
        .json({ message: "Admin Logged Out Sucessfully" });
    }
    return res
      .clearCookie("token")
      .clearCookie("refreshToken")
      .json({ message: "User Logged Out Sucessfully " });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = { signOut };
