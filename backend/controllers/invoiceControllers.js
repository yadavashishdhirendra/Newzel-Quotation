const Invoice = require('../models/invoiceModel');
const cron = require('node-cron');
const sendEmail = require('../utils/SendEmail');
const User = require('../models/userModel');

// ROUTE 1=> CREAT INVOICE
exports.createInvoice = async (req, res) => {
    try {
        const {
            companyname,
            kindatt,
            offerno,
            revisionnumber,
            customerrefno,
            validity,
            projectname,
            products,
            to,
            contact
        } = req.body;
        const newdata = [{
            itemname: req.body,
            itemdesc: req.body,
            itemsize: req.body,
            itemuom: req.body,
            itemqty: req.body,
            itemprice: req.body,
            pricesign: req.body,
        }]


        if (!companyname) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            })
        }
        if (!to) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            })
        }
        if (!contact) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            })
        }
        const createInvoice = await Invoice.create({
            companylogo: {
                public_id: 'companylogo',
                url: 'https://www.ditechcdm.com/Images/Logo/DiTech%20Logo%20DM_Final%20(1).png',
            },
            companyname,
            offerno,
            kindatt,
            revisionnumber,
            customerrefno,
            validity,
            projectname,
            products,
            newdata,
            to,
            contact,
            owner: req.user.id
        });

        const user = await User.findById(req.user.id)
        user.invoices.push(createInvoice._id)
        await user.save()
        await createInvoice.save()
        res.status(201).json({
            success: true,
            createInvoice,
            message: "Invoice Created Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// ROUTE 2 => GET ALL INVOICE
exports.getAllInvoice = async (req, res) => {
    try {
        let Invoices;
        if (!req.body.month) {
            Invoices = await Invoice.find({}).sort('-createdAt');
        } else if (req.body.month == 'ALL') {
            Invoices = await Invoice.find({}).sort('-createdAt');
        } else {
            Invoices = await Invoice.find({
                "month": req.body.month
            }).sort('-createdAt');
        }
        var totalAmount = 0;
        Invoices.forEach(invoice => {
            invoice.products.forEach(prod => {
                totalAmount += prod.itemqty * prod.itemprice;
            });

        });
        res.status(200).json({
            success: true,
            Invoices,
            InvoiceCount: Invoices.length,
            totalAmount
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// ROUTE 3 => GET SINGLE INVOICE DETAILS
exports.getSingleInvoice = async (req, res) => {
    try {
        const getInvoice = await Invoice.findById(req.params.id);
        if (!getInvoice) {
            return res.status(500).json({
                success: false,
                message: "Invoice not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Invoice Fetch Successfully",
            getInvoice
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// ROUTE 4 => DELETE INVOICE
exports.deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice doesn't Exist"
            })
        }

        await invoice.remove();
        res.status(200).json({
            success: true.valueOf,
            message: "Invoice Deleted Success.",
            invoice
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// ROUTE 5 => UPDATE INVOICE
exports.updateInvoice = async (req, res) => {
    try {
        const updateData = {
            companyname: req.body.companyname,
            offerno: req.body.offerno,
            kindatt: req.body.kindatt,
            revisionnumber: req.body.revisionnumber,
            customerrefno: req.body.customerrefno,
            to: req.body.to,
            contact: req.body.contact,
            validity: req.body.validity,
            projectname: req.body.projectname,
            products: req.body.products,
            itemname: req.body.itemname,
            itemdesc: req.body.itemdesc,
            itemsize: req.body.itemsize,
            itemuom: req.body.itemuom,
            itemqty: req.body.itemqty,
            itemprice: req.body.itemprice
        }

        const Invoices = await Invoice.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: false,
            useFindAndModify: false
        });
        res.status(200).json({
            success: true,
            Invoices
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// exports.filterMoth = async (req, res) => {
//     try {
//         const filterData = await Invoice.find({
//             "month": req.body.month
//         })

//         res.status(200).json({
//             success: true,
//             filterData
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }


// const job = schedule.scheduleJob('0 0 0 1 */1 *', function () {
//     console.log('heeeeey')
// });

// cron.schedule('* * * * * *', () => {
// console.log('Running Task in every min.');
// });


// ROUTE 6 => SEND AN EMAIL WITH INVOICE DATA
// cron.schedule('* * * * * *', async () => {
//     try {
//         const today = new Date()
//         const currentMonthData = today.toLocaleString('default', {
//             month: 'long'
//         })
//         const Invoices = await Invoice.find({
//             "month": {
//                 currentMonthData
//             }
//         }).sort('-createdAt');
//         var totalAmount = 0;
//         Invoices.forEach(invoice => {
//             invoice.products.forEach(prod => {
//                 totalAmount += prod.itemqty * prod.itemprice;
//             });

//         });
//         res.status(200).json({
//             success: true,
//             Invoices,
//             InvoiceCount: Invoices.length,
//             totalAmount
//         })
//         const message = `Total Amount of Invoice Created - ${totalAmount}`
//         try {
//             await sendEmail({
//                 email: "yadavashishdhirendra@gmail.com",
//                 subject: "Monthly Invoice Review",
//                 message
//             })
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// })

// ROUTE 7 => GET LOGGED IN USER QUOTATION
exports.loggedUserQuotation = async (req, res) => {
    try {
        let Invoices;
        if (!req.body.month) {
            Invoices = await Invoice.find({ owner: req.user.id }).sort('-createdAt');
        } else if (req.body.month == 'ALL') {
            Invoices = await Invoice.find({ owner: req.user.id }).sort('-createdAt');
        } else {
            Invoices = await Invoice.find({
                owner: req.user.id,
                "month": req.body.month
            }).sort('-createdAt');
        }
        var totalAmount = 0;
        Invoices.forEach(invoice => {
            invoice.products.forEach(prod => {
                totalAmount += prod.itemqty * prod.itemprice;
            });

        });
        res.status(200).json({
            success: true,
            Invoices,
            InvoiceCount: Invoices.length,
            totalAmount
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}