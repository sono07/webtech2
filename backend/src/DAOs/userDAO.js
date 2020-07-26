const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const dbConnect = require('../db/dbConnect').dbConnect;

async function getUser(user, successCallback, errorCallback) {
    const db = await dbConnect();
    const collection = db.collection('users');

	collection.find({"name": user.name}).toArray((error, users) => {
        try {
            assert.strictEqual(null, error, error);

            successCallback(users);
        } catch (error) {
            errorCallback("" + error);
        }
    });
}

async function registerUser(user, successCallback, errorCallback) {
    const db = await dbConnect();
    const collection = db.collection('users');

    collection.insertOne(user, (error,response) => {
        try {
            assert.strictEqual(null, error, error);
            assert.strictEqual(1, response.insertedCount, "Failed to login user, please register.");

            successCallback(response.insertedId);
        } catch (error) {
            errorCallback("" + error);
        }
    })
}

module.exports = {
    "getUser" : getUser,
    "registerUser" : registerUser
};