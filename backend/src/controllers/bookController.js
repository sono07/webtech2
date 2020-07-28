const routes = require("express").Router();

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


routes.post("/readBooksForTitle", (req, resp) => {
    if(req.body["title"] === undefined) {
        resp.status(400).contentType("application/json").send({"error": "title must be defined"});
        return;
    }

    bookService.readBooksForTitle(req.body["title"], (books) => {
        resp.status(200).contentType("application/json").send({"books": books});
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
});

routes.post("/readBooksForAuthor", (req, resp) => {
    if(req.body["author"] === undefined) {
        resp.status(400).contentType("application/json").send({"error": "author must be defined"});
        return;
    }

    bookService.readBooksForAuthor(req.body["author"], (books) => {
        resp.status(200).contentType("application/json").send({"books": books});
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
});

routes.post("/readBookForISBN", (req, resp) => {
    if(req.body["isbn"] === undefined) {
        resp.status(400).contentType("application/json").send({"error": "ISBN must be defined"});
        return;
    }
	
    bookService.readBookForISBN(req.body["isbn"], (book) => {
        resp.status(200).contentType("application/json").send({"book": book});
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
});

routes.post("/readBookForId", (req, resp) => {
    if(req.body["id"] === undefined) {
        resp.status(400).contentType("application/json").send({"error": "Id must be defined"});
        return;
    }
	
    bookService.readBookForId(req.body["id"], (book) => {
        resp.status(200).contentType("application/json").send({"book": book});
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
});

routes.post("/createBook", (req, resp) => {
    let book;
    try {
        book = new Book.BookFromJson(req.body["book"]);
    } catch (error) {
        resp.status(400).contentType("application/json").send({"error": error});
        return;
    }

    bookService.createBook(book, (bookID) => {
        resp.status(200).contentType("application/json").send({"bookID": bookID});
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
});

module.exports = {
    routes: routes
};