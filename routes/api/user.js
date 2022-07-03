const router = require('express').Router();
const UserController = require('../../controllers/auth/usercontroller');

router.post('/signup', UserController.newUser);
router.post('/login', UserController.loginUser)

module.exports = router;