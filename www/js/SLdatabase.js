
var db;

function errorHandler(error) {
    console.error("SQL Error: " + error.message);
}

var DB={
    createDatabase: function () {
        var shortName = "SLFinalDB";
        var version = "1.0";
        var displayName = "DB for SL Hotel app";
        var dbSize = 2 * 1024 * 1024;

        function dbCreateSuccess() {
            console.info("Success: Database created successfully");
        }
        //2nd way
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },
    createTables: function () {

        function txFunction(tx){

            var sql = "CREATE TABLE IF NOT EXISTS type( "
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL);";

            var sql2 = "CREATE TABLE IF NOT EXISTS reserve( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "Name VARCHAR(30) NOT NULL," +
                "typeId INTEGER NOT NULL," +
                "Email VARCHAR(30)," +
                "request TEXT," +
                "checkInDate DATE," +
                "checkOutDate DATE," +
                "FOREIGN KEY(typeId) REFERENCES type(id));";
            let options = [];
            function successCallback() {
                console.info("Success: type table created successfully");
            }
            function successCallback2() {
                console.info("Success: reserve table created successfully");
            }
            tx.executeSql("Drop TABLE IF EXISTS type");
            tx.executeSql(sql, options, successCallback, errorHandler);
            tx.executeSql(sql2, options, successCallback2, errorHandler);
            tx.executeSql("INSERT INTO type (name) VALUES ('Guest')",options);
            tx.executeSql("INSERT INTO type (name) VALUES ('King')",options);
            tx.executeSql("INSERT INTO type (name) VALUES ('Queen')",options);

        }
        function successTransaction(tx) {
            console.info("Success: Transaction is successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    dropTables: function () {
        function txFunction(tx) {
            var sql = "DROP TABLE IF EXISTS type;";
            var sql2 = "DROP TABLE IF EXISTS reserve";
            var options = [];
            function successCallback() {
                console.info("Success: table dropped successfully");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
            tx.executeSql(sql2, options, successCallback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Transaction is successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
}

var Type ={
    selectAll: function(options, callback){
        function txFunction(tx) {
            var sql = "SELECT * FROM type;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: selectAll Transaction is successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
}
