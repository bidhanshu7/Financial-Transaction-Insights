const grpc = require("@grpc/grpc-js");
const bcrypt = require("bcrypt");
const sequelize = require("../../../db/connection");

const UpdateUser = async (call, callback) => {
  const { username, email, password, roleId } = call.request;

  let hashedPassword;
  let update = [];

  if (!email) {
    return callback({
      error: grpc.status.NOT_FOUND,
      details: "Please provide the Email",
    });
  }
  if (!roleId) {
    return callback({
      error: grpc.status.NOT_FOUND,
      details: "Please Provide RoleId for users",
    });
  }

  try {
    const query = `SELECT email FROM users WHERE email = :email`;
    const [checkUserExist, _] = await sequelize.query(query, {
      raw: true,
      replacements: {
        email,
      },
    });

    if (!checkUserExist || checkUserExist.length == 0) {
      return callback({
        error: grpc.status.NOT_FOUND,
        details: "User Not found",
      });
    }

    if (username) {
      update.push(`username = :username`);
    }
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
      update.push(`password = :hashedPassword`);
    }
    if (roleId) {
      update.push(`roleId = :roleId`);
    }

    if (update.length === 0) {
      return callback({
        error: grpc.status.INVALID_ARGUMENT,
        details: "No valid fields to update.",
      });
    }

    const updateQuery = `UPDATE users SET ${update.join(
      ", "
    )} WHERE email = :email`;

    const [credentials, __] = await sequelize.query(updateQuery, {
      raw: true,
      replacements: {
        username,
        hashedPassword,
        email,
        roleId,
      },
    });

    callback(null, {
      message: "User Credentials Updated Successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    callback({
      details: err.detail || "Internal Server error",
      code: err.code || grpc.status.INTERNAL,
    });
  }
};

module.exports = { UpdateUser };
