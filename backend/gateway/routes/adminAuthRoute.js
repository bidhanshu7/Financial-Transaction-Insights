const express = require("express");
const SignInAdmin = require("../controller/admin/auth/signInAdmin");
const getProfileDetails = require("../controller/admin/auth/getProfileDetails");
const authMiddleware = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/verifyAdmin");
const { generateCsrf } = require("../middleware/generateCsrf");
const { validateCsrf } = require("../middleware/validateCsrf");
const { signOut } = require("../controller/admin/auth/signOut");


const router = express.Router();

router.route("/csrf").get(generateCsrf);
router.route("/signin").post(SignInAdmin);
router
  .route("/getProfileDetails/:adminId")
  .get(authMiddleware, verifyAdmin, getProfileDetails);

router.route('/signOut').delete(authMiddleware, signOut);


module.exports = router;
