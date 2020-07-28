import React, { Component } from "react";
import { UserForm } from "./forms/userForm"
import { UserMain } from "./userMain"
import UserStore from "./../../stores/userStore"
import UserActions from "./../../actions/userActions"

export class UserPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: UserStore._user,
            books: UserStore._books,
        };
    }

    onUserChange = () => {
        this.setState({user : UserStore._user});
    };

    onBooksChange = () => {
        this.setState({books : UserStore._books});
    };

    componentDidMount() {
        UserStore.addUserChangeListener(this.onUserChange);
        UserStore.addBooksChangeListener(this.onBooksChange);
    }

    componentWillUnmount() {
        UserStore.removeUserChangeListener(this.onUserChange);
        UserStore.removeBooksChangeListener(this.onBooksChange);
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">

                    <div className="text-center header-text">
                        <h1>
                            {this.state.user !== undefined &&
                                <span>
                                    Welcome "{this.state.user.name}"!
                                    &nbsp;
                                    <i className="clickable fas fa-user-times" onClick={() => {UserActions.unsetUser();}} />
                                </span>
                            }
                        </h1>
                    </div>
                    {
                        (this.state.user === undefined)
                            ? <UserForm />
                            : <UserMain user={this.state.user} books={this.state.books} />
                    }
                </div>
            </React.Fragment>
        )
    }
}