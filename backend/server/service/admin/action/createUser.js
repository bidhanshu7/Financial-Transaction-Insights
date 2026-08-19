const grpc = require("@grpc/grpc-js");
const sequelize = require("../../../db/connection");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { QueryTypes } = require("sequelize");
const { validateCredentials } = require("./utils");



const CreateUser = async (call, callback) => {
  const { username, email, password, roleId } = call.request;



 const adminId = call.metadata.get("loggedInAdminId")[0];

  try {
    if (!email || !roleId || !username || !password || !adminId) {
      return callback({
        details: "Please provide all details",
        code: grpc.status.INVALID_ARGUMENT,
      });
    }

    await validateCredentials(username, email, password)

    const [checkAccountExists, _] = await sequelize.query(
      "SELECT id,email FROM users WHERE email=:email",
      {
        raw: true,
        replacements: {
          email,
        },
      }
    );

    if (checkAccountExists.length === 1) {
      return callback({
        details: "User with this email already exists",
        code: grpc.status.ALREADY_EXISTS,
      });
    }

    const checkRoleExists = await sequelize.query(
      "SELECT id from roles WHERE id=:roleId",
      {
        raw: true,
        replacements: {
          roleId,
        },
        type: QueryTypes.SELECT,
      }
    );
    if (checkRoleExists.length === 0) {
      return callback({
        details: "Role you are trying to assign does not exists",
        code: grpc.status.ALREADY_EXISTS,
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT_ROUNDS) || 10
    );
    const [__, userCreated] = await sequelize.query(
      "INSERT INTO users (id,username,email,password,roleId,createdBy) VALUES (:id,:username,:email,:password,:roleId,:createdBy)",
      {
        raw: true,
        replacements: {
          id: uuidv4(),
          username,
          email,
          password: hashedPassword,
          roleId,
          createdBy: adminId,
        },
      }
    );

    if (userCreated === 1) {
      return callback(null, {
          message: "User created successfully",
          success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return callback({
      details: error.details || "Failed to Sign up user",
      code: error.code || grpc.status.INTERNAL,
    });
  }
};

module.exports = CreateUser;
