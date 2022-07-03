const router = require('express').Router();
const loancontroller = require('../../controllers/loancontroller')
const { auth } = require('../../middlewares/auth')

router.post('/createloan',[auth],loancontroller.NewLoan);
router.get('/loans',[auth], loancontroller.ShowLoans);

module.exports = router;