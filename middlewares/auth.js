//required modules
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const { JWT_SECRET } = process.env;

exports.auth = async (req, res, next) => {
    try{
        const bearerHeader = req.headers.authorization;
        const token = bearerHeader.split(' ')[1];
                      //console.log(token || req)
        if(!token){
            return res.send({ status: 403, message: "token has expired"});
        }
        try{
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
        } catch (err) {
            return res.send({ status: 401, message:"Invalid token"});
        }
        return next();
} catch (error) {
    res.send({
        status: 401,
        error,
        message: "user session has expired, login to continue",
    });
    console.log(error)
    }
}