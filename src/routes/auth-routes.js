const express = require('express')

//const passport = require('passport')
//const accountCheckGoogle = require('../middleware/accountCheck-Google')

const authController = require('../controllers/auth-controller')
const { catchErrors } = require('../middleware/error-handlers')

const router = express.Router()

// router.post('/exchange', accountCheckGoogle, catchErrors(authController.exchange))
// router.post('/login', passport.authenticate('login'), catchErrors(authController.login))
// router.post('/refresh', catchErrors(authController.refresh))

router.post('/login', catchErrors(authController.login))
router.post('/refresh', catchErrors(authController.refresh))

module.exports = router
