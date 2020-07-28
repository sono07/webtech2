import React, { Component } from "react";
//import BookStore from "../../../stores/bookStore"
import BookActions from "../../../actions/bookActions"

export class CreateBookForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            book: {
                title: null,
                author: null,
				price: null,
				isbn: null,
            },
            error: {
                book: {
					title: undefined,
					author: undefined,
					price: undefined,
					isbn: undefined,
                }
            }
        };
    }

    handleTitleChange = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => (
				{
					...prevState,
					book: {
						...prevState.book,
						title: newValue
				}
            }),
            () => this.validateTitle()
        )
    };

	handleAuthorChange = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => (
                {
                    ...prevState,
                    book: {
                        ...prevState.book,
                        author: newValue
                    }
                }
            ),
            () => this.validateAuthor()
        )
    };
	
	handlePriceChange = (event) => {
        let newValue = event.target.value;
        if(typeof newValue != 'number') newValue = Number(newValue);

        this.setState((prevState) => (
                {
                    ...prevState,
                    book: {
                        ...prevState.book,
                        price: newValue
                    }
                }
            ),
            () => this.validatePrice()
        )
    };
	
	handleISBNChange = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => (
                {
                    ...prevState,
                    book: {
                        ...prevState.book,
                        isbn: newValue
                    }
                }
            ),
            () => this.validateISBN()
        )
    };
	
	validateTitle = () => {
        if(this.state.book.title === "") {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        book: {
                            ...prevState.error.book,
                            title: true
                        }
                    }
                }
            ));

            return false;
        } else {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        book: {
                            ...prevState.error.book,
                            title: false
                        }
                    }
                }
            ));

            return true;
        }
    };
	
		validateAuthor = () => {
        if(this.state.book.author === "") {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        book: {
                            ...prevState.error.book,
                            author: true
                        }
                    }
                }
            ));

            return false;
        } else {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        book: {
                            ...prevState.error.book,
                            author: false
                        }
                    }
                }
            ));

            return true;
        }
    };
	
		validatePrice = () => {
        if(this.state.book.price === "") {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        book: {
                            ...prevState.error.book,
                            price: true
                        }
                    }
                }
            ));

            return false;
        } else {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        book: {
                            ...prevState.error.book,
                            price: false
                        }
                    }
                }
            ));

            return true;
        }
    };


	validateISBN = () => {
        if(this.state.book.isbn === "") {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        book: {
                            ...prevState.error.book,
                            isbn: true
                        }
                    }
                }
            ));

            return false;
        } else {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        book: {
                            ...prevState.error.book,
                            isbn: false
                        }
                    }
                }
            ));

            return true;
        }
    };

    validateForm = () => {
        let isValid = true;

        isValid = this.validateTitle() && isValid;
        isValid = this.validateAuthor() && isValid;
		isValid = this.validatePrice() && isValid;
		isValid = this.validateISBN() && isValid;

        return isValid;
    };
	
	saveForm = (event) => {
        event.preventDefault();
        if(this.validateForm()) {
            BookActions.createBook(this.state.book)
        }
    };

    render() {
		return (

            <form onSubmit={(e) => this.saveForm(e)}>
				<h2>Create new book</h2>
				
                <div className={ this.state.error.book.title === true
                    ? "form-group has-error"
                    : this.state.error.book.title === false
                        ? "form-group has-success"
                        : "form-group"
                    }
                >
                    <label className="control-label">Title:</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        value={this.state.book.title}
                        onChange={this.handleTitleChange}
                        onBlur={this.validateTitle}
                        className={"form-control"}
                    />
                    {
                        this.state.error.book.title &&
                        <div className="error-desc">Invalid value!</div>
                    }
                </div>

                <div className={this.state.error.book.author === true
                    ? "form-group has-error"
                    : this.state.error.book.author === false
                        ? "form-group has-success"
                        : "form-group"
                    }
                >
                    <label className="control-label">Author:</label>
                    <input
                        id="author"
                        type="text"
                        name="author"
                        placeholder="Enter author"
                        value={this.state.book.author}
                        onChange={this.handleAuthorChange}
                        onBlur={this.validateAuthor}
                        className={"form-control"}
                    />
                    {
                        this.state.error.book.author &&
                        <div className="error-desc">Invalid value!</div>
                    }
                </div>
				
			    <div className={ this.state.error.book.price === true
                    ? "form-group has-error"
                    : this.state.error.book.price === false
                        ? "form-group has-success"
                        : "form-group"
                    }
                >
                    <label className="control-label">Price:</label>
                    <input
                        id="price"
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        value={this.state.book.price}
                        onChange={this.handlePriceChange}
                        onBlur={this.validatePrice}
                        className={"form-control"}
                    />
                    {
                        this.state.error.book.price &&
                        <div className="error-desc">Invalid value or ISBN already in use!</div>
                    }
                </div>
				
				<div className={ this.state.error.book.isbn === true
                    ? "form-group has-error"
                    : this.state.error.book.isbn === false
                        ? "form-group has-success"
                        : "form-group"
                    }
                >
                    <label className="control-label">ISBN:</label>
                    <input
                        id="isbn"
                        type="text"
                        name="isbn"
                        placeholder="Enter ISBN"
                        value={this.state.book.isbn}
                        onChange={this.handleISBNChange}
                        onBlur={this.validateISBN}
                        className={"form-control"}
                    />
                    {
                        this.state.error.book.isbn &&
                        <div className="error-desc">Invalid value!</div>
                    }
                </div>
				
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Add book</button>
                </div>
            </form>
        )
    }
}