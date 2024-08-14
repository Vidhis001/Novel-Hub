// Load express
    const express = require("express");
    const app = express();
    const body_parser = require("body-parser")
    app.use(body_parser.json()) ;
    // app.use(body_parser.urlencoded({ extended: false }));
    // app.set('view engine', 'ejs');
    // const Form = require("./formSchema");

// Load mongoose
    const mongoose = require("mongoose");
    const uri = "mongodb+srv://divyang9575:123456789abc@cluster0.8wny3yf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    mongoose.connect(uri, {ssl: true, tlsAllowInvalidCertificates: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

    require("./book");
    const book_collection = mongoose.model("BookCollection");


    app.get("/", (req, res) => {
        // res.render("book_form")
        res.send("This is the books service");
    });

// Create functionality
    app.post("/book", (req, res) => {
        console.log("Using body parser showing the book!\n",  req.body)
        
        const new_book = {
            title : req.body.title ,
            author : req.body.author ,
            noOfPages : req.body.noOfPages,
            publisher : req.body.publisher
        };
        
        
        const book_obj = book_collection(new_book) ;
        book_obj.save().then(() => {
            res.send("Book submitted named : " + new_book.title) ; // sending a response is neccesary 
            console.log("New book created and saved ! " + new_book.title);
        }).catch((err) => {
            if(err) {
                console.log("Error occurred while saving book : ", err);
                throw err;
            }
        })
        
    });

// list the books
    function listbook(buk) {
        for (let i in buk ) {
            console.log("Title : ", buk[i].title);
            console.log("Author : ", buk[i].author);
        }
    }

    app.get("/list_books", (req, res) => {
        console.log("Listing all the books!")
        book_collection.find().then((buk) => {
            // console.log("Title : ", buk) ;
            res.json(buk)
            // listbook(buk)
        }).catch((err) => { if(err) throw err; })

        // res.send("Books will be listed in your console!");
    });


//list a single book using a id
    app.get("/list_book/:id", (req, res) => {
        console.log("Listing book with the id : ", req.params.id)

        book_collection.findById(req.params.id).then((buk) => {
            if(buk) 
                res.json(buk)
            else 
                res.sendStatus(404); // not found

        }).catch((err) => { if(err) throw err; })

        // res.send("Books will be listed in your console!");
    });


// Delete the book using an id (using postman)
    app.delete("/delete_book/:id", (req, res) => {
        console.log("Deleting book with id : ", req.params.id) 

        book_collection.findOneAndDelete(req.params.id).then(() => {
            res.send("Book removed with success!")
        }).catch((err) => {if(err) throw err;})
    });



// server listen
    app.listen(4545, (err) => {
        if (err) console.log("Error in server setup!");
        console.log("Server is running -- This is the books service !");
    });

