const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/verifyAdmin");
const createUser = require("../controller/admin/action/createUser");
const getRoleDetails = require("../controller/role/getRoleDetails");
const createRole = require("../controller/admin/action/createRole");
const addFilterType = require("../controller/admin/action/addFilterType");
const addFilter = require("../controller/admin/action/addFilter");
const getFilterByType = require("../controller/admin/action/getFilterByType");
const getFilterTypes = require("../controller/admin/action/getFilterTypes");
const getAllUsers = require("../controller/admin/action/getAllUsers");
const { getAllRoles } = require("../controller/admin/action/getAllRoles");
const { UpdateUser } = require("../controller/admin/action/updateUserDetails");
const { EditRole } = require("../controller/admin/action/editRole");
const {
  getUserDetailsById,
} = require("../controller/admin/action/getUserDetailsById");

const router = express.Router();

router.route("/createUser").post(authMiddleware, verifyAdmin, createUser);
router.route("/createrole").post(authMiddleware, verifyAdmin, createRole);
router.route("/getRoleDetails/:roleId").get(authMiddleware, getRoleDetails);
router.route("/addFilterType").post(authMiddleware, verifyAdmin, addFilterType);
router
  .route("/addFilter/:filterTypeId")
  .post(authMiddleware, verifyAdmin, addFilter);
router
  .route("/getFiltersByType/:filterTypeId")
  .get(authMiddleware, verifyAdmin, getFilterByType);
router.route("/getFilterTypes").get(getFilterTypes);
router
  .route("/getAllUsers/:adminId")
  .get(authMiddleware, verifyAdmin, getAllUsers);
router.route("/getAllRoles").get(authMiddleware, verifyAdmin, getAllRoles);
router
  .route("/updateUserDetails/:userId")
  .patch(authMiddleware, verifyAdmin, UpdateUser);
router.route("/editRole/:roleId").patch(authMiddleware, verifyAdmin, EditRole);
router
  .route("/getUserDetails/:userId")
  .get(authMiddleware, verifyAdmin, getUserDetailsById);

module.exports = router;
