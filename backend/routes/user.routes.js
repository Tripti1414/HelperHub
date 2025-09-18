const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
// const { protect } = require('../middleware/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/verify',userController.verify)
// router.get('/profile', protect, userController.getProfile);

module.exports = router;
