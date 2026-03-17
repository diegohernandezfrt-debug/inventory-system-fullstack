const express = require("express");
const router = express.Router();

const { createMovement, getMovements } = require("../controllers/movement.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, createMovement);
router.get("/", authMiddleware, getMovements);

module.exports = router;