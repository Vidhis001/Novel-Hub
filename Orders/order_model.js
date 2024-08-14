const mongoose = require("mongoose")
// const {ObjectID} = require("mongodb")


mongoose.model('order_collection', {
    customerId : {
        type : mongoose.Types.ObjectId ,
        require : true
    },
    bookId : {
        type : mongoose.Types.ObjectId,
        require : true
    },
    orderDate : {
        type : Date,
        require : false
    },
    deliveryDate : {
        type : Date,
        require : false
    }
});