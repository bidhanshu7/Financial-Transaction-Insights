const grpc = require("@grpc/grpc-js");
const sequelize = require("../../../db/connection");
const bcrypt = require("bcrypt");

const SignInUser = async (call, callback) => {
  try {
    const { email, password } = call.request;

    if (!email || !password) {
      throw {
        details: "Please provide both credentials",
        code: grpc.status.INVALID_ARGUMENT,
      };
    }

    const [checkAccountExists, _] = await sequelize.query(
      "SELECT id,username,email,password,roleId  FROM users WHERE email=:email",
      {
        raw: true,
        replacements: {
          email,
        },
      }
    )

    if (checkAccountExists.length === 0) {
      throw {
        details: "User with this email does not exists",
        code: grpc.status.NOT_FOUND,
      };
    }

    const userDetails = checkAccountExists[0];

    const isCredentialValid = await bcrypt.compare(
      password,
      userDetails.password
    );

    if (!isCredentialValid) {
      throw {
        details: "Invalid credentials",
        code: grpc.status.PERMISSION_DENIED,
      };
    }

    const { password: pass, ...rest } = userDetails;

    return callback(null, {
      user: rest,
      message: "User login successful",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return callback({
      details: error.details || "Failed to sign in user",
      code: error.code || grpc.status.INTERNAL,
    });
  }
};

module.exports = SignInUser;
