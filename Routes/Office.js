// Routers for Authentification of users
const router = require("express").Router();
const CtrCounter = require("../Controllers/Office");

router.get("/", CtrCounter.getOfficeDatas);
router.post("/changeState", CtrCounter.changeState);

module.exports = router;