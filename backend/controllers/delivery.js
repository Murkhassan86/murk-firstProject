const deliveryInfo = require('../models/delivery'); // delivery modal schema

exports.createDelivery = (req, res, next) => {
const delivery = new deliveryInfo({
    fullName: req.body.fullName,
    province: req.body.province,
    phoneNumber: req.body.phoneNumber,
    provinceName: req.body.provinceName,
    email: req.body.email,
    address: req.body.address,
    proceed: req.body.proceed,
    status: req.body.status,
    bucketId: req.body.bucketId
});
delivery.save()
.then(result => {
    res.status(200).json({
        message: 'delivery info created successfully',
        result: result,
        success: true
    })
})
.catch(err => {
    res.status(401).json ({
        error: err
    })
})
}

exports.getDelivery = (req, res, next) => {
    deliveryInfo.find()
    .select("fullName province phoneNumber provinceName email address bucketId proceed status")
    .populate("bucketId")
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'delivery info fetched successfully',
            result: result,
            success: true
        })
    })
    .catch(err => {
        res.status(401).json({
            error: err
        })
    })
}
    exports.updateDelivery = (req, res, next) => {
        const delivery = new deliveryInfo({
            _id: req.body._id,
            fullName: req.body.fullName,
            province: req.body.province,
            phoneNumber: req.body.phoneNumber,
            provinceName: req.body.provinceName,
            email: req.body.email,
            address: req.body.address,
            proceed: req.body.proceed,
            status: req.body.status,
            bucketId: req.body.selectedBucketId
        });
        deliveryInfo.updateOne({_id: req.body._id}, delivery)
        .then(result => {
            res.status(200).json({
                message: 'delivery info updated successfully',
                result: delivery,
                success: true
            })
        })
        .catch(err => {
            res.status(401).json({
                error: err
            })
            console.log(error);
        })
    }
