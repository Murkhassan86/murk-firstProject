const express = require('express');

const Login = require('../models/login'); // login Schema

const UserController = require('../controllers/user'); // login/signUp Controller
const BucketController = require('../controllers/bucket'); // Bucket item Controller
const DeliveryController = require('../controllers/delivery'); // delivery Controller

const extractFile = require('../middleware/file'); 

//user info practicing
const UserInfo = require('../models/userInfo'); // create user schema (not important)

// Create Event
const event = require ('../models/event');


// create rejection reason for userItem
const Reason = require('../models/reason');
//Multer used for file extractions e.g images
const multer = require('multer');

const router = express.Router();


//To registers Users
router.post("/signup", UserController.createUser) ;
router.get("/signup", UserController.getCreateUser);
router.delete("/signup/:id", UserController.deleteCreateUser);

// Login Users
router.post("/login", UserController.loginUser);
router.get("/login", UserController.getLoginUser);
router.delete("/login/:id", UserController.deleteLoginUser);

// delivery info for shopping cart
router.post("/delivery", DeliveryController.createDelivery);
router.get("/delivery", DeliveryController.getDelivery);
router.put("/delivery", DeliveryController.updateDelivery);

// user info start

router.post("/userInfo", (req, res, next) => {
    const userInfo = new UserInfo({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        country: req.body.country,
        birthDate: req.body.birthDate
    });
    userInfo.save().then(result => {
        res.status(200).json({
            message: 'User Information created Successfully',
            result: result,
            success: true
        });
    })
    .catch(err => {
       return res.status(401).json({
            error: err
        })
    })
}) 

router.get("/userInfo", (req, res, next) => {
    console.log(req.query);
    const Name = +req.query.firstName;
    const LastName = +req.query.lastName;
    const country = +req.query.country;
    const date = +req.query.birthDate; 
    const user = UserInfo.find(); 
    // if (user) {
    //     return res.status(201).json({
    //         message: 'Load userInfo List Success',
    //         userInfo: user
    //     });
    // }
    // else {
    //     return res.status(401).json({
    //         message: 'load UserInfo List failed'
    //     })
    // }
    user
    .then(info => {
        res.status(200).json({
            message: 'load userInfo list success',
            result: info,
            success: true
        })
    })
    .catch(err => {
        return res.status(401).json({
            error: err
        })
    })
})

router.delete("/userInfo/:id", (req, res, next) => {
    UserInfo.deleteOne({_id: req.params.id})
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'user deleted successfully'
        })
    })
})

router.put("/userInfo", (req, res, next) => {
    const user = new UserInfo ({
        _id: req.body._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        country: req.body.country,
        birthDate: req.body.birthDate
    })
    console.log(user);
    UserInfo.updateOne(user)
    .then(result => {
        res.status(200).json({
            message: 'User Updated Successfully',
            result: user,
            success: true
        })
    })
})

// Create event calendar
router.post("/event", (req, res, next) => {
    const eventInfo = new event({
        title: req.body.title,
        date: req.body.date,
        description: req.body.description
    })
    eventInfo.save().then(result => {
        res.status(200).json ({
            message: 'event created successfully',
            success: true,
            result: result
        })
    })
})

router.get("/event", (req, res, next) => {
    const eventInfo = event.find();
    eventInfo
    .then(result => {
        res.status(200).json ({
            message: 'event info fetched successfully',
            success: true,
            result: result
        })
    })
})

// add info in bucket for sell
router.post("/bucket", extractFile , BucketController.createBucket);
router.get("/bucket", BucketController.getBucket);
router.put("/bucket", BucketController.updateBucket);
router.delete("/bucket/:id", BucketController.deleteBucket);

// store reason for userItems from admin 
 router.post("/reason", (req, res, next) => {
     const reason = new Reason({
         reason: req.body.reason,
         UserId: req.body._id,
         bucket: req.body.userItemId
     })
     reason.save().then(
         result => {
             res.status(200).json({
                 message: 'rejection reason created successfully',
                 result: result,
                 success: true
             })
         }
     )
     .catch(err => {
         res.status(401).json({
             error: err
         })
     })
 })

 router.get("/reason", (req,res,next) => {
    Reason.find()
    .select("reason, UserId")
    .populate("UserId")
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'reason fetched successfully',
            result: result,
            success: true
        })
    })
    .catch(err => {
        res.status(401).json({
            error: err
        })
    })
 })

// router.get("/bucket/:id", (req, res, next) => {

// })
module.exports = router;