
function User(name, pw, email) {
	// milyen formában kell beleírni a regexet?
	const emailRegEx = new RegExp("/\S+@\S+\.\S+/");
    if(name === undefined || typeof name !== 'string' || name.trim() === "" ) {
        throw "Error! Name must be a defined string and not empty!";
    }
    if(pw === undefined || typeof pw !== 'string' || pw.trim() === "") {
        throw "Error! Pw must be a defined string and not empty!";
    }
    if(email === undefined || typeof emailRegEx !== 'object' || email.trim() === "") {
        throw "Error! Email must be a defined string and not empty!";
    }

    this.name =  name;
    this.pw =  pw;
    this.email = email;
}

function UserFromJson(user) {
    if(user === undefined) {
        throw "Error! User must be defined!";
    }

    return new User(user.name, user.pw, user.email);
}

module.exports = {
    User: User,
    UserFromJson: UserFromJson
};