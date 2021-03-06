const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const dbConnect = require('../db/dbConnect').dbConnect;

async function readBooks(successCallback, errorCallback) {
    const db = await dbConnect();
    const collection = db.collection('books');

    collection.find().toArray((error, books) => {
        try {
            assert.strictEqual(null, error, error);

            successCallback(books);
        } catch (error) {
            errorCallback("" + error);
        }
    });
}

async function readBooksForTitle(title, successCallback, errorCallback) {
    const db = await dbConnect();
    const collection = db.collection('books');

    collection.find({"title": title}).toArray((error, books) => {
        try {
            assert.strictEqual(null, error, error);

            successCallback(books);
        } catch (error) {
            errorCallback("" + error);
        }
    });
}

async function readBooksForAuthor(author, successCallback, errorCallback) {
    const db = await dbConnect();
    const collection = db.collection('books');

    collection.find({"author": author}).toArray((error, books) => {
            try {
                assert.strictEqual(null, error, error);

                successCallback(books);
            } catch (error) {
                errorCallback("" + error);
            }
		});
}

async function readBookForId(id, successCallback, errorCallback) {
    const db = await dbConnect();
    const collection = db.collection('books');

    collection.findOne({"_id": ObjectID(id)}, (error, book) => {
        try {
            assert.strictEqual(null, error, error);

            successCallback(book);
        } catch (error) {
            errorCallback("" + error);
        }
    });
}

async function readBookForISBN(isbn, successCallback, errorCallback) {
    const db = await dbConnect();
    const collection = db.collection('books');

    collection.findOne({"isbn": isbn}, (error, book) => {
        try {
            assert.strictEqual(null, error, error);

            successCallback(book);
        } catch (error) {
            errorCallback("" + error);
        }
    });
}


async function createBook(book, successCallback, errorCallback) {
    const db = await dbConnect();
    const collection = db.collection('books');

    collection.insertOne(book, (error,response) => {
        try {
            assert.strictEqual(null, error, error);
            assert.strictEqual(1, response.insertedCount, "Failed to insert book");

            successCallback(response.insertedId);
        } catch (error) {
            errorCallback("" + error);
        }
    });
}

module.exports = {
    "readBooks" : readBooks,
    "readBooksForTitle" : readBooksForTitle,
    "readBooksForAuthor": readBooksForAuthor,
    "readBookForISBN" : readBookForISBN,
    "readBookForId": readBookForId,
    "createBook" : createBook
};