const express = require("express");
const mongoose = require("mongoose");
const app = express();

const axios = require("axios")
var ObjectId = require('mongodb').ObjectId;

const body_parser = require("body-parser");
app.use(body_parser.json());

// connecting with the database
    const uri = "mongodb+srv://divyang9575:123456789abc@cluster0.8wny3yf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    mongoose.connect(uri)
    .then(() => {
        console.log("Orders database connected succesfully!");
    })
    .catch((err) => {
        if (err) console.log("An error while connecting orders database : ", err);
    });

require("./order_model");
const order_collection = mongoose.model("order_collection");

// create a new order
    app.post("/order", (req, res) => {
        
        let str1 = req.body.customerId;
        let str2 = req.body.bookId;
        const new_order = {
            customerId: mongoose.Types.ObjectId(str1),
            bookId: mongoose.Types.ObjectId(str2),
            orderDate: req.body.orderDate,
            deliveryDate: req.body.deliveryDate
        };

        const order = new order_collection(new_order);
        order.save()
            .then(() => {
                console.log("Order created with success!");
            })
            .catch((err) => {
                if (err) throw err;
            });
        res.send("Order create hogya hai !");
    });

// list all the order
    app.get("/list_orders", (req, res) => {
    order_collection.find()
        .then((ords) => {
        res.json(ords);
        })
        .catch((err) => {
        if (err) throw err;
        });
    });


// list the customer name and book name of the given order
    app.get("/list_order_by_names/:id", (req, res) => {

        order_collection.findById(req.params.id)
        .then((ord) => {
            if(ord) {
                let order_object = {
                    customerName : '',
                    bookTitle : ''
                }
                
                // axios http request for customer and book name
                console.log("ord " + ord)
                axios.get("http://localhost:5555/list_one_customer/" + ord.customerId)
                .then((response) => {
                    console.log("response data " + response.data)
                    order_object.customerName = response.data.name
                })
                .catch((err) =>{
                    if(err) {
                        console.log("An error occured axios 1 ", err)
                    }
                })

                axios.get("http://localhost:4545/list_book/" + ord.bookId)
                .then((response) => {
                    order_object.bookTitle = response.data.title
                })
                .catch((err) =>{
                    if(err) {
                        console.log("An error occured axios 2 ", err)
                    }
                })
                
                res.json(order_object)
                // res.send("quick respone")
            }
            else {
                res.send("Invalid order ID!")
            }
        })
    });

// get request from the webpage of client
    app.get("/", (req, res) => {
    res.send("This is a orders web page!");
    });

    app.listen(7777, () => {
    console.log("Order webpage is active now at port", 7777);
    });
