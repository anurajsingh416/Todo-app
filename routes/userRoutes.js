const userController = require('../controller/userController');
const { isAuthenticated } = require('../middleware/userAuth')
const express = require('express');

const router = express.Router();

router.get('/register',userController.showForm)
router.post('/register',userController.register)
router.get('/login',userController.loginForm)
router.post('/login',userController.login)
router.get('/dashboard',isAuthenticated,userController.dashboard)
router.get('/logout',userController.logout)
router.get('/',userController.landing)
module.exports = router;