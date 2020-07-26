function UserService(userDAO) {
    this.winston = require('winston');
    this.logger = this.winston.createLogger({
        level: 'info',
        format: this.winston.format.json(),
        transports: [
            new this.winston.transports.File({filename: 'logs/error.log', level: 'error'}),
            new this.winston.transports.File({filename: 'logs/combined.log'})
        ]
    });

    if(userDAO !== undefined || userDAO === null) {
        this.userDAO = userDAO;
    } else {
        this.userDAO = require('../DAOs/userDAO');
    }
}

UserService.prototype.getUser = function(user, successCallback, errorCallback){
    this.userDAO.getUser(user, (users) => {
        this.logger.info(`getUser: ${users.length} users were found!`);
        successCallback(users);
    }, (error) => {
        this.logger.error("Error! " + error);
        errorCallback(error);
    })
};

UserService.prototype.registerUser = function(user, successCallback, errorCallback){
    this.userDAO.registerUser(user, (userID) => {
        this.logger.info("registerUser: user created");
        successCallback(userID);
    }, (error) => {
        this.logger.error("Error! " + error);
        errorCallback(error);
    })
};

module.exports = UserService;