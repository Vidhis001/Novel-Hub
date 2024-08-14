const express = require("express")
const mongoose = require("mongoose")
const app = express()

const body_parser = require("body-parser")
app.use(body_parser.json())

// connecting with the database
    const uri = "mongodb+srv://divyang9575:123456789abc@cluster0.8wny3yf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    mongoose.connect(uri).then(() => {
        console.log("Customers database connected succesfully!")
    }).catch((err) => {
        if (err) console.log("An error while connecting : ", err)
    });

    require("./customer_model")
    const customer_collection = mongoose.model("customer_collection") // name of the collection

// get request from the webpage of client
    app.get("/", (req, res) => {
        res.send("This is a customer web page!")
    });

// getting the data of the customer
    app.post("/customer", (req, res) => {
        let new_customer = {
            name : req.body.name,
            age : req.body.age,
            address : req.body.address
        }

        let customerObj = new customer_collection(new_customer)
        customerObj.save().then(() => {
            let str = new_customer.name + " created succesfully"
            res.send(str)
            console.log("Customer created named : ", new_customer.name)
        }).catch((err) => {
            if(err) console.log("Error while saving customer!", err)
        })
    });


// listing all the customers
    app.get("/list_customers", (req, res) => {
        console.log("Listing all the customers!")
        customer_collection.find().then((cust) => {
            res.json(cust)
        }).catch((err) => {
            if(err) console.log("Error while listing all customers!", err)
        })
    });

// listing a single customer
    app.get("/list_one_customer/:id", (req, res) => {
        console.log("Listing customer with id : ", req.params.id)

        customer_collection.findById(req.params.id).then((cust) => {
            if(cust) 
                res.json(cust)
            else 
                res.send("Invalid customer ID!")
            
        }).catch((err) => {
            if(err) console.log("Error while listing single customer!", err)
        })
    })

// deleting a customer by id using postman
    app.delete("/delete_customer/:id", (req, res) => {
        
        customer_collection.findOneAndDelete(req.params.id).then(() => {
            res.send("Customer deleted with success!")
            console.log("Deleting customer with id : ", req.params.id)
        }).catch((err) => {
            if(err) console.log("Error while deleting customer!", err)
        })
    });


    app.listen(5555, () => {
        console.log("Customers is listening to the port", 5555)
    });