const grpc = require("@grpc/grpc-js");
const { z } = require("zod");

const validateCredentials = async (username,email, password) => {
  try{
        const credentialsSchema = z.object({
          username: z
            .string()
            .min(3, "Username must be at least 3 characters long")
            .max(50, "Username must be at most 50 characters long")
            .regex(/^[a-zA-Z ]+$/, "Username can only contain letters and spaces"),
          email: z.string().email("Invalid email format"),
          password: z
            .string()
            .min(8, "Minimum value for password is 8")
            .regex(/[a-z]/, "Password should contain at least one lower case letter")
            .regex(/[A-Z]/, "Password should contain at least one upper case letter")
            .regex(/[0-9]/, "Password should contain at least one number")
            .regex(/[\W_]/, "Password should contain at least one special character"),
        });
        credentialsSchema.parse({
          username,
          email,
          password,
        });

  } catch (err) {
    if (err instanceof z.ZodError) {
      throw {
        code: grpc.status.INVALID_ARGUMENT,
        details: err.errors[0].message, 
      };
    } else {
      console.error(err);
      throw {
        code: grpc.status.INTERNAL,
        details: "Internal server error",
      };
    }
  }
};

module.exports = { validateCredentials };
