const express = require('express');
const {
    createInvoice,
    getAllInvoice,
    getSingleInvoice,
    deleteInvoice,
    updateInvoice,
    loggedUserQuotation
} = require('../controllers/invoiceControllers');
const {
    isAuthenticatedUser
} = require('../middleware/auth');
const router = express.Router();

router.route('/createinvoice').post(isAuthenticatedUser, createInvoice);
router.route('/getinvoice').post(isAuthenticatedUser, getAllInvoice);
router.route('/getsingleinvoice/:id').get(isAuthenticatedUser, getSingleInvoice);
router.route('/deleteinvoice/:id').delete(isAuthenticatedUser, deleteInvoice);
router.route('/updateinvoice/:id').put(isAuthenticatedUser, updateInvoice);
router.route('/logged/invoice').post(isAuthenticatedUser, loggedUserQuotation)
// router.route('/sendemail').post(sendEmailMonthly);
module.exports = router;