// Routers for Authentification of users
const router = require("express").Router();
const CtrlUser = require("../Controllers/users");

router.post("/logout", CtrlUser.logout);

module.exports = router;