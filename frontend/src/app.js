import React, { Component } from "react";
import { Route, Redirect, NavLink, HashRouter } from "react-router-dom";
import { UserPage } from "./components/user/userPage"

class App extends Component {
        render() {
                return (
                    <div id="webtech2App">
                        <HashRouter>
                                <div>
                                    <nav className="navbar navbar-inverse" id="my-navbar">
                                        <div className="container-fluid">
                                            <div className="navbar-header">
                                                <div className="navbar-brand">Webtech2</div>
                                            </div>
                                            <ul className="nav navbar-nav navbar-right">
                                                <li>
                                                    <NavLink to="/user" activeClassName="active-nav-link">User</NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>

                                <Route path="/" exact render={() => (<Redirect to="/user" />)} />
                                <Route path="/user" component={UserPage} />

                            </div>
                        </HashRouter>
                    </div>
				);
		}
}

export default App;
