const express = require('express');
const router = express.Router();

const {
  createEntry,
  createExit,
  getHistory
} = require('../controllers/inventory.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.post('/entry', authMiddleware, createEntry);
router.post('/exit', authMiddleware, createExit);
router.get('/history/:productId', authMiddleware, getHistory);

module.exports = router;