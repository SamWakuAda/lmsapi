const bcrypt = require("bcrypt");
const User = require("../../models/users");

//creating
exports.newUser = async (req, res) => {
    try {
        const { firstname, lastname, username, email, phone ,password} = req.body;
        const user = await User.findOne({ email });

        if(user){
            return res.status(400).send({
                message: 'user already exists!'
            })
        }

        const newUser = new User({
            firstname,
            lastname,
            username,
            email,
            phone,
            password
        });

        //saving instance to db
        await newUser.save();
        //await user.generateAuthToken();
        console.log(newUser)
        res.status(201).send({
            data:newUser,
        });
        
        res.redirect('/')
    } catch (error) {
        res.status(500).send({
            status: 500,
            error: error.message,
        });
    }
}

exports.loginUser = async (req, res, next) => {
    try{
        //checking user email
        const {email, password} = req.body;
        const user = await User.findOne({ email }).exec();
        if(!user) return res.status(401).json({message: 'user not found'});

        //checking user password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)return res.status(401).json({message: 'Incorrect password please try again'});
        await user.generateAuthToken();

        res.status(200).send({
            data:user,
            message: "login successful",
        });
    }catch(err){
        res.status(500).send({ error: error})
        return res.send(error.message);
    }
    next();
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params._id;
        const user = await User.findById({_id: id}).exec();

        if(!user) {
            return res.status(404).send({
                message: 'user not found',
            });
        }

        await user.remove();

        res.status(200).send({
            message: 'user deleted',
        });
    } catch (error) {
        res.status(500).send({
            error,
        });
    }
}