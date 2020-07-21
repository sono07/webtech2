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

    collection.find({"book.title": title}).toArray((error, books) => {
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

    collection.find({"book.author": author}.toArray((error, books) => {
            try {
                assert.strictEqual(null, error, error);

                successCallback(books);
            } catch (error) {
                errorCallback("" + error);
            }
        }
    );
}
// a create-t nem tudom hogy kellene :|
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
    })
}

module.exports = {
    "readBooks" : readBooks,
    "readBooksForTitle" : readBooksForTitle,
    "readBooksForAuthor": readBooksForAuthor,
    "createBook" : createBook
};