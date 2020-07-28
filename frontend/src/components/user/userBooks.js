import React, { Component } from "react";
import BookStore from "./../../stores/bookStore"
import BookActions from "./../../actions/bookActions"

export class UserBooks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allBooks: BookStore._allBooks
        };
    }
	
	onAllBooksChange = () => {
        this.setState({allBooks : BookStore._allBooks});
    };

    componentDidMount() {
        BookStore.addAllBooksChangeListener(this.onAllBooksChange);
        BookActions.refreshBooks();
    }

    componentWillUnmount() {
        BookStore.removeAllBooksChangeListener(this.onAllBooksChange);
    }
	
	setFilter = (event) => {
        const value = event.target.value;

        this.setState((prevState) => ({
            ...prevState,
            filter: value
        }))
    };
	
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">

                    <div>
                        <h2>Books</h2>

                        <ul className="list-group margin-top-30">
                            {
                                this.state.allBooks.length === 0 &&
                                <div>No books yet</div>
                            }
                            {
								this.state.allBooks.map((book, i) =>
									{
											return <li key={i} className="list-group-item">

                                                <div className="row">
                                                    <div className="col-sm-12">
														<div>
															<div><label className="details-label">Title: </label>{book.title}</div>
															<div><label className="details-label">Author: </label>{book.author}</div>
															<div><label className="details-label">Price: </label>{book.price}</div>
															<div><label className="details-label">ISBN: </label>{book.isbn}</div>
														</div>
													</div>
												</div>
                                        </li>
                                    }
                                )
                            }
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}