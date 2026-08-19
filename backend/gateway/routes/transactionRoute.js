const express = require("express");
const { getTransaction } = require("../controller/transactions/getTransaction");
const {
  getTransactionCountByStatus,
} = require("../controller/transactions/getTransactionCountByStatus");
const authMiddleware = require("../middleware/authMiddleware");
const checkRoleFilterMiddleware = require("../middleware/checkRoleFilterMiddleware");
const { GetTransactionCountByChannel } = require("../controller/transactions/getTransactionCountByChannel");




const router = express.Router();

router
  .route("/getTransactions")
  .get(authMiddleware, checkRoleFilterMiddleware, getTransaction);

router.route("/getTransactionCountByStatus").get(authMiddleware, checkRoleFilterMiddleware, getTransactionCountByStatus);
router.route("/getTransactionCountByChannel").get(authMiddleware, checkRoleFilterMiddleware, GetTransactionCountByChannel);


module.exports = router;
