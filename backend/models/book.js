function Book(title, author, price) {
    if(title === undefined || typeof title !== 'string') {
        throw "Error! Title must be a defined string and not empty!";
    }
	if(author === undefined || typeof author !== 'string') {
        throw "Error! Author must be a defined string and not empty!";
    }
	
	if(price === undefined || typeof price !== 'number' || price < 0) {
        throw "Error! Price must be a defined positive number!";
    }

	this.title = title;
	this.author = author;
    this.price = price;
}


function BookFromJson(book) {
    if(book === undefined) {
        throw "Error! Book cannot be undefined!";
    }

    return new Book(book.title, book.author, book.price);
}

module.exports = {
    Book: Book,
    BookFromJson: BookFromJson
};