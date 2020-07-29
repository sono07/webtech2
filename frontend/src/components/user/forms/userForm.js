import React, { Component } from "react";
import UserActions from "../../../actions/userActions"

export class UserForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: "",
                pw: "",
            },
            error: {
                user: {
                    name: undefined,
                    pw: undefined,
                }
            }
        };
    }

    handleNameChange = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => (
				{
					...prevState,
					user: {
						...prevState.user,
						name: newValue
					}
				}
			),
			() => this.validateName()
        )
    };

    handlePwChange = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => (
                {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        pw: newValue
                    }
                }
            ),
            () => this.validatePw()
        )
    };

    validateName = () => {
        if(this.state.user.name === "") {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        user: {
                            ...prevState.error.user,
                            name: true
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
                        user: {
                            ...prevState.error.user,
                            name: false
                        }
                    }
                }
            ));

            return true;
        }
    };

    validatePw = () => {
        if(this.state.user.pw === "") {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        user: {
                            ...prevState.error.user,
                            pw: true
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
                        user: {
                            ...prevState.error.user,
                            pw: false
                        }
                    }
                }
            ));

            return true;
        }
    };

    validateForm = () => {
        let isValid = true;

        isValid = this.validateName() && isValid;
        isValid = this.validatePw() && isValid;
		
		console.log(isValid);

        return isValid;
    };

    saveForm = (event) => {
        event.preventDefault();
        if(this.validateForm()) {
            UserActions.setUser(this.state.user)
        }
    };

    render() {
        return (

            <form onSubmit={(e) => this.saveForm(e)}>

                <div className={ this.state.error.user.name === true
                    ? "form-group has-error"
                    : this.state.error.user.name === false
                        ? "form-group has-success"
                        : "form-group"
                    }
                >
                    <label className="control-label">Name:</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={this.state.user.name}
                        onChange={this.handleNameChange}
                        onBlur={this.validateName}
                        className={"form-control"}
                    />
                    {
                        this.state.error.user.name &&
                        <div className="error-desc">Invalid value!</div>
                    }
                </div>

                <div className={this.state.error.user.pw === true
                    ? "form-group has-error"
                    : this.state.error.user.pw === false
                        ? "form-group has-success"
                        : "form-group"
                    }
                >
                    <label className="control-label">Pw:</label>
                    <input
                        id="pw"
                        type="password"
                        name="pw"
                        placeholder="Enter password"
                        value={this.state.user.pw}
                        onChange={this.handlePwChange}
                        onBlur={this.validatePw}
                        className={"form-control"}
                    />
                    {
                        this.state.error.user.pw &&
                        <div className="error-desc">Invalid value!</div>
                    }
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        )
    }
}