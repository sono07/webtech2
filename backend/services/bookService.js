function BookService(bookDAO) {
    this.winston = require('winston');
    this.logger = this.winston.createLogger({
        level: 'info',
        format: this.winston.format.json(),
        transports: [
            new this.winston.transports.File({filename: 'logs/error.log', level: 'error'}),
            new this.winston.transports.File({filename: 'logs/combined.log'})
        ]
    });

    if(bookDAO !== undefined || bookDAO === null) {
        this.bookDAO = bookDAO;
    } else {
        this.bookDAO = require('../DAOs/bookDAO');
    }
}

BookService.prototype.readBooks = function(successCallback, errorCallback){
    this.bookDAO.readBooks((books) => {
        this.logger.info(`readBooks: ${books.length} books were found!`);
        successCallback(books);
    }, (error) => {
        this.logger.error("Error! " + error);
        errorCallback(error);
    })
};

BookService.prototype.readBooksForTitle = function(title, successCallback, errorCallback){
    this.bookDAO.readBooksForTitle(title, (books) => {
        this.logger.info(`readBooksForTitle: ${books.length} books were found!`);
        successCallback(books);
    }, (error) => {
        this.logger.error("Error! " + error);
        errorCallback(error);
    })
};

BookService.prototype.readBooksForAuthor = function(author, successCallback, errorCallback){
    this.bookDAO.readBooksForAuthor(author, (books) => {
        this.logger.info("readBooksForAuthor: ${books.length} books were found!");
        successCallback(books);
    }, (error) => {
        this.logger.error("Error! " + error);
        errorCallback(error);
    })
};

BookService.prototype.readBookForISBN = function(isbn, successCallback, errorCallback){
    this.orderDAO.readBookForISBN(isbn, (book) => {
        this.logger.info("readBookForISBN: book was found!");
        successCallback(book);
    }, (error) => {
        this.logger.error("Error! " + error);
        errorCallback(error);
    })
};

BookService.prototype.createBook = function(isbn, book, successCallback, errorCallback){

    this.bookDAO.createBook(isbn, book, () => {
        this.logger.info("createBook: Book created");
        successCallback();
    }, (error) => {
        this.logger.error("Error! " + error);
        errorCallback(error);
    })
};

module.exports = BookService;