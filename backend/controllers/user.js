const bcrypt = require('bcrypt');
const SignUp = require('../models/login2'); // signUp schema
const Login = require('../models/login'); // login Schema
const jwt = require('jsonwebtoken');

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) 
    .then(hash => {
        const signUp = new SignUp({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            phone: req.body.phone,
            city: req.body.city,
            address: req.body.address,
            role: req.body.role
        });
    signUp.save()
    .then(result => {
        res.status(201).json({
            message: 'User Created Successfully',
            result: result,
            success: true

        })
        console.log(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
    
}) 
}

exports.getCreateUser = (req, res, next) => {
    const signup = SignUp.find();
    signup
    .then(result => {
        res.status(200).json({
            message: 'Registered Users fetched successfully',
            result: result,
            success: true
        })
    }) 
}

exports.deleteCreateUser = (req, res, next) => {
    SignUp.deleteOne({_id: req.params.id})
    .then(result => {
        res.status(200).json ({
            message: 'user deleted successfully',
            success: true
        })
    })
}

exports.loginUser = (req, res, next) => {
    let fetchedUser;
    SignUp.findOne({email: req.body.email})
    .then(user => {
        if(!user) {
           return res.status(401).json({
               message: 'email does not match, failed!',
               success: false
           });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password)

    })
    // SignUp.findOne({role: req.body.role})
    // .then(user => {
    //     if (!user) {
    //         return res.status(401).json ({
    //             message: 'role is not admin',
    //             success: false
    //         })
    //     }
      
    // })
    .then(result => {
        if (!result) {
            return res.status(401).json({
                message: 'password does not match',
                success: false
            });      
        }
        const token = jwt.sign(
           { email: fetchedUser.email, userId: fetchedUser._id, role: fetchedUser.role, firstName: fetchedUser.firstName, phone: fetchedUser.phone, city: fetchedUser.city, address: fetchedUser.address },
           process.env.JWT_KEY, 
           { expiresIn: "1h" }
        );
        // console.log(token);
        res.status(200).json({
            message: 'Logged in Successfully',
            token: token,
            success: true,
            result: result,
            email: fetchedUser.email,
            userId: fetchedUser._id,
            expiresIn: 3600,
            role: fetchedUser.role,
            firstName: fetchedUser.firstName,
            phone: fetchedUser.phone,
            city: fetchedUser.city,
            address: fetchedUser.address
            // role: fetchedUser.role
    
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(401).json({
            message: 'auth failed!'
        })
    })
}

exports.getLoginUser = (req, res, next) => {
    const user = Login.find();
    user
    .then(userData => {
        res.status(200).json({
            message: 'Login Users are fetched from database',
            result: userData
        })
    })
    .catch(err => {
        res.status(501).json({
            error: err
        })
    })
}

exports.deleteLoginUser = (req, res, next) => {
    Login.deleteOne({_id: req.params.id})
    .then(result => {
        console.log(result);
        res.status(200).json ({
            message: 'User deleted successfully',
            success: true
        })
    }
    )
}