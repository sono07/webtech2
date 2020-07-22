function Book(title, author, price, isbn) {
    if(title === undefined || typeof title !== 'string') {
        throw "Error! Title must be a defined string and not empty!";
    }
	if(author === undefined || typeof author !== 'string') {
        throw "Error! Author must be a defined string and not empty!";
    }
	
	if(price === undefined || typeof price !== 'number' || price < 0) {
        throw "Error! Price must be a defined positive number!";
    }
	
	if(isbn === undefined || typeof isbn !== 'string') {
        throw "Error! ISBN must be a defined string and not empty!";
    }
	this.title = title;
	this.author = author;
    this.price = price;
	this.isbn = isbn;
}


function BookFromJson(book) {
    if(book === undefined) {
        throw "Error! Book cannot be undefined!";
    }

    return new Book(book.title, book.author, book.price, book.isbn);
}

module.exports = {
    Book: Book,
    BookFromJson: BookFromJson
};