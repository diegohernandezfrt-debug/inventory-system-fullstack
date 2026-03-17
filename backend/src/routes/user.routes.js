const authenticateToken = require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();

const { createUser, getUsers, loginUser } = require('../controllers/user.controller');


router.post('/', createUser);
router.post('/login', loginUser);
router.get('/', authenticateToken, getUsers);

module.exports = router;