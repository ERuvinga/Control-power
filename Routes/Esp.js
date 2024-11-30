// Routers for Authentification of users
const router = require("express").Router();
const CtrEsp = require("../Controllers/Esp");

router.get("/", CtrEsp.saveEspDatas);
router.get("/StopRotation", CtrEsp.changeState);

module.exports = router;