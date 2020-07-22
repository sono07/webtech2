const routes = require("express").Router();

const User = require("../models/user");
const Book = require("../models/book");

const BookService = require("../services/bookService");
const bookService = new BookService();

routes.get("/readBooks", (req, resp) => {
	bookService.readBooks((books) => {
        resp.status(200).contentType("application/json").send({"books": books});
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
});