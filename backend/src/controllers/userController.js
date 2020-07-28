const routes = require("express").Router();

const User = require("../models/user");

const UserService = require("../services/userService");
const userService = new UserService();

routes.post("/getUser", (req, resp) => {
	 let user;
    try {
        user = new User.UserFromJson(req.body["user"]);
    } catch (error) {
     resp.status(400).contentType("application/json").send({"error": "Name and password must be defined"});
     return;
    }
	
    userService.getUser(req.body["user"], (users) => {
        resp.status(200).contentType("application/json").send({"users": users});
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
});


routes.post("/registerUser", (req, resp) => {
    let user;
    try {
        user = new User.UserFromJson(req.body["user"]);
    } catch (error) {
        resp.status(400).contentType("application/json").send({"error": error});
        return;
    }

    userService.registerUser(user, (userID) => {
        resp.status(200).contentType("application/json").send({"userID": userID});
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
});

module.exports = {
    routes: routes
};