const express = require("express");
const solanaController = require("../controllers/solanaController");

const router = express.Router();

router.get("/balance", solanaController.getBalance);
router.post("/send", solanaController.sendTransaction);

module.exports = router;
