const express = require("express");
const signInUser = require("../controller/user/signInUser");
const authMiddleware = require("../middleware/authMiddleware");
const { signOut } = require("../controller/admin/auth/signOut");
const router = express.Router();

router.route("/signInUser").post(signInUser);

router.route("/signOut").delete(authMiddleware, signOut);

module.exports = router;
