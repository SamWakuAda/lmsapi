const Loan = require('../models/loans')

//creating new loan
exports.NewLoan = async (req, res) => {
    try{
        const { 
            type,
            servicefee,
            amountrequested,
            amountpaid,
            paymentmode
        } = req.body;

        const newloan = new Loan({
            type,
            servicefee,
            amountrequested,
            amountpaid,
            paymentmode
        });

        //console.log(newloan)
        await newloan.save();
        res.status(201).send({
            data: newloan,
        })
    } catch(error) {
        res.status(500).send({
            status:500,
            error: error.message
        })
    }
}

//getting all loans
exports.ShowLoans = async (req, res) => {
    try {
        const loans = await Loan.find()
        
        if(loans.length<1) {
            return res.send("No loans found")
        }
        return res.status(200).send(loans);
        
    } catch(error) {
        console.log(error);
    }
}