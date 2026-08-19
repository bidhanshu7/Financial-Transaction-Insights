const csrf = require("csrf");
const express = require("express");
const dotenv = require("dotenv");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
dotenv.config();
const cookieParser = require("cookie-parser");
const transactionRouter = require("./routes/transactionRoute");
const userRouter = require("./routes/userRoute");
const adminAuthRouter = require("./routes/adminAuthRoute");
const adminActionRouter = require("./routes/adminActionRoute");
const authMiddleware = require("./middleware/authMiddleware");
const refreshUserToken = require("./routes/utils/refreshUserToken");
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,PATCH,HEAD,DELETE",
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
const csrfProtection = csrf();
app.use(express.urlencoded({ extended: true }));

app.get("/api/refresh", refreshUserToken);
app.use("/api/transaction", transactionRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminAuthRouter);
app.use("/api/admin/action", adminActionRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});

module.exports = app;
