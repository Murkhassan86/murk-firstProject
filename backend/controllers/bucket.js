const Bucket = require('../models/bucket'); // bucket Schema

exports.createBucket = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const bucket = new Bucket({
        category: req.body.category,
        price: req.body.price,
        size: req.body.size,
        color: req.body.color,
        age: req.body.age,
        fabric: req.body.fabric,
        description: req.body.description,
        agreement: req.body.agreement,
        status: req.body.status,
        createdAt: req.body.createdAt,
        bucketIndex: req.body.bucketIndex,
        UserId: req.body.UserId,
        image:  url + "/images/" + req.file.filename
    });
    bucket.save().then(result => {
        res.status(200).json({
            message: 'Bucket is created successfully',
            result: result,
            success: true
        })
    });
}

exports.getBucket = (req, res, next) => {
    // const bucket = Bucket.find({_id: req.body.UserId})
   Bucket.find()
   .select("category price size color age fabric description agreement image status createdAt bucketIndex reason fullName province phoneNumber provinceName email address proceed UserId")
   .populate("UserId")
   .exec()
    // Bucket.findById(req.params.id)
    .then(result => {
            res.status(200).json({
                message: 'bucket info fetched successfully',
                result: result,
                success: true,
                // _id: req.body.UserId
            })     
    })
    .catch(err => {
        res.status(401).json({
            error: err
        })
    })
}

exports.updateBucket = (req, res, next) => {
    const userItemsInfo = new Bucket({
        _id: req.body._id,
        category: req.body.category,
        price: req.body.price,
        size: req.body.size,
        color: req.body.color,
        age: req.body.age,
        fabric: req.body.fabric,
        description: req.body.description,
        agreement: req.body.agreement,
        image: req.body.image,
        status: req.body.status,
        createdAt: req.body.createdAt,
        bucketIndex: req.body.bucketIndex,
        reason: req.body.reason,
            fullName: req.body.fullName,
            province: req.body.province,
            phoneNumber: req.body.phoneNumber,
            provinceName: req.body.provinceName,
            email: req.body.email,
            address: req.body.address,
            proceed: req.body.proceed,
       UserId: req.body.selectedUserId
    });
   Bucket.updateOne({_id: req.body._id}, userItemsInfo)
   .then(result => {
       res.status(200).json({
           message: 'Bucket updated Successfully',
           result: userItemsInfo,
           success: true
       })
   })
//    .catch(err => {
//        res.status(401).json ({
//            error: err
//        })
//        console.log(error);
//    })  
}

exports.deleteBucket = (req, res, next) => {
    Bucket.deleteOne({_id: req.params.id})
    .then(
        result => {
            res.status(200).json({
                message: 'bucket deleted successfully',
                result: result,
                // status: true
            })
        }
    )
}

