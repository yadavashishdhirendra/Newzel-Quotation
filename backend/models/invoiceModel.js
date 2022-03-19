const mongoose = require('mongoose');

const today = new Date()

const invoiceSchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: true,
    },
    offerno: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        index: {
            unique: true
        }
    },
    kindatt: {
        type: String,
    },
    companylogo: {
        public_id: String,
        url: String,
    },
    revisionnumber: {
        type: Number,
    },
    customerrefno: {
        type: String
    },
    products: [{
        itemname: String,
        itemdesc: String,
        itemsize: String,
        itemuom: String,
        itemqty: Number,
        itemprice: Number,
        pricesign: String
    }],
    to: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    validity: {
        type: String
    },
    projectname: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    month: {
        type: String,
        default: today.toLocaleString('default', {
            month: 'long'
        })
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Invoice", invoiceSchema)