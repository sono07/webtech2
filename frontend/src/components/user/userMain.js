import React, { Component } from "react";
import { UserBooks } from "./userBooks";
import { CreateBookForm } from "./forms/createBookForm";
import BookActions from "./../../actions/bookActions"

export class UserMain extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }
    createBook = (books) => {
        let parsedBooks = [...books];
        for (let i = 0; i < parsedBooks.length; i++) {
            parsedBooks[i].title = String(parsedBooks[i].title);
            parsedBooks[i].author = String(parsedBooks[i].author);
            parsedBooks[i].price = parseInt(parsedBooks[i].price);
			parsedBooks[i].isbn = String(parsedBooks[i].isbn);
        }

        const BookToCreate = {
            ...books,
            books: parsedBooks
        };

        BookActions.createBook(BookToCreate);
    };

    render() {
        return (
            <React.Fragment>
                <CreateBookForm createBookCallback={this.createBook} />
                <hr />
                <UserBooks books={this.props.books} />
            </React.Fragment>
        )
    }
}