const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// User routes
router.post('/auth/signup', userController.signUp);
router.post('/auth/login', userController.login);
router.post('/auth/logout/:userId', userController.logout);

// New routes
router.get('/auth/getCouponCode/:userId', userController.getCouponCode);
router.post('/auth/bookShow/:userId', userController.bookShow);

module.exports = router;
