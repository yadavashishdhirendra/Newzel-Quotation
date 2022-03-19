const express = require('express');
const {
    registerUser,
    loginUser,
    logoutUser,
    getUserDetails,
    updatePassword,
    forgotPassword,
    resetPassword,
    updateUserProfile,
    getAllUsers,
    getSingleUser
} = require('../controllers/userController');
const {
    isAuthenticatedUser
} = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/me').get(isAuthenticatedUser, getUserDetails);
router.route('/password-update').put(isAuthenticatedUser, updatePassword);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/updateavatar').put(isAuthenticatedUser, updateUserProfile);
router.route('/getallusers').get(isAuthenticatedUser, getAllUsers);
router.route('/getsingleuser/:id').get(isAuthenticatedUser, getSingleUser)

module.exports = router;