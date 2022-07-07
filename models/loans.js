const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoanSchema = new Schema ({
    type: {
        type:String
    },
    servicefee:{
        type: Number,
        required: true
    },
    amountrequested: {
        type: Number,
        required: true
    },
    amountpaid:{
        type: Number,
        required: true
    },
    paymentmode:{
        type: String,
        required: true
    },
    //
    paymentperiod: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default:Date.now
    }
})

const Loan = new mongoose.model("Loans", LoanSchema)
module.exports = Loan;

