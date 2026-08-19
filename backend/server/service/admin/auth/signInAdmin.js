const grpc = require("@grpc/grpc-js");
const sequelize = require("../../../db/connection");
const bcrypt = require("bcrypt");

const SignInAdmin = async (call, callback) => {
  const { email, password } = call.
  request;

  try {
    if (!email || !password) {
      throw {
        details: "Please provide the credentials",
        code: grpc.status.INVALID_ARGUMENT,
      };
    }
    const [checkAdminExists, _] = await sequelize.query(
      "SELECT id,username,email,password FROM admins WHERE email=:email",
      {
        raw: true,
        replacements: {
          email,
        },
      }
    );

    if (checkAdminExists.length === 0) {
      throw {
        details: "Admin with this email does not exists",
        code: grpc.status.ALREADY_EXISTS,
      };
    }

    const adminAccountData = checkAdminExists[0];

    const correctCredentials = await bcrypt.compare(
      password,
      adminAccountData.password
    );

    if (!correctCredentials) {
      throw {
        details: "Invalid credentials",
        code: grpc.status.PERMISSION_DENIED,
      };
    }

    const { password: pass, ...rest } = adminAccountData;

    return callback(null, {
      admin: rest,
      success: true,
      message: "Admin logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return callback({
      details: error.details || "Failed to sign in admin",
      code: error.code || grpc.status.INTERNAL,
    });
  }
};

module.exports = SignInAdmin;
