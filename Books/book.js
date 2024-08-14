const mongoose = require("mongoose")

mongoose.model("BookCollection", {
    title : {
        type : String,
        require : true
    },
    author : {
        type : String,
        require : true
    },
    noOfPages : {
        type : Number,
        require : false
    },
    publisher : {
        type : String,
        require : false
    }
})