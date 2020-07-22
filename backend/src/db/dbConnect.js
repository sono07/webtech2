const MongoClient = require('mongodb').MongoClient;

let dbConnection;

const dbConnect = async function() {
    if(dbConnection !== undefined) {
        return dbConnection;
    } else {
        try {
            const client = await MongoClient.connect(
                "mongodb://127.0.0.1:27017",
                options = {useNewUrlParser: true, auto_reconnect: true}
            );

            dbConnection = client.db("mydb");
            console.log('Connected successfully')
        } catch (error) {
            console.error('Connection failed!')
        }

        return dbConnection;
    }
};

module.exports = {
    dbConnect: dbConnect,
};