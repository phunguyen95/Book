// apiServer.js
var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
var app = express();

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/bookshop");
var Book = require("./models/books");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "#MongoDB - connection error: "));
// -->> SET UP SESSIONS << ---
app.use(
	session({
		secret: "mySecretString",
		saveUninitialized: false,
		resave: false,
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },
		store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })
	})
);
// SAVE TO SESSIONS
app.post("/cart", function(req, res) {
	var cart = req.body;
	req.session.cart = cart;
	req.session.save(function(err) {
		if (err) {
			throw err;
		}
		res.json(req.session.cart);
	});
});

// Get session cart API
app.get("/cart", function(req, res) {
	if (typeof req.session.cart !== "undefined") {
		res.json(req.session.cart);
	}
});
app.post("/books", function(req, res) {
	console.log(req.body);
	console.log("vo day");
	var book = req.body;
	Book.create(book, function(err, books) {
		if (err) {
			throw err;
		}
		res.json(books);
	});
});
//APIs
///get
app.get("/books", function(req, res) {
	console.log("vo welcome");
	Book.find(function(err, books) {
		if (err) {
			throw err;
		}

		res.json(books);
	});
});

//delete
app.delete("/books/:_id", function(req, res) {
	console.log("dvo deleete");
	var query = { _id: req.params._id };
	Book.remove(query, function(err, books) {
		if (err) {
			throw err;
		}
		res.json(books);
	});
});

app.put("/books/:_id", function(req, res) {
	var book = req.body;
	var query = req.params._id;
	//if field doesnt exist $set will set a new field
	var update = {
		$set: {
			title: book.title,
			description: book.description,
			image: book.image,
			price: book.price
		}
	};
	//when true returns the updated document
	var options = { new: true };
	Book.findOneAndUpdate(query, update, options, function(err, books) {
		if (err) {
			throw err;
		}
		res.json(books);
	});
});

app.get("/images", function(req, res) {
	const imgFolder = __dirname + "/public/images";
	const fs = require("fs");
	fs.readdir(imgFolder, function(err, files) {
		if (err) {
			return console.log(err);
		}
		const filesArr = [];
		files.forEach(function(file) {
			filesArr.push({ name: file });
		});
		res.json(filesArr);
	});
});
//end API
app.listen(3001, function(err) {
	if (err) {
		return console.log(err);
	}
	console.log("api server is listening on 3001");
});

module.exports = app;
