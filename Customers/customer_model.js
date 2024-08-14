const mongoose = require("mongoose")

mongoose.model('customer_collection', {
    name : {
        type : String,
        require : true
    },
    age : {
        type : Number,
        require : true
    },
    address : {
        type : String,
        require : true
    }
});