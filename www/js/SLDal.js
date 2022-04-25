var Reserve = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO reserve(Name,typeId,Email,request,checkInDate,checkOutDate) VALUES(?,?,?,?,?,?) ;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: insert Transaction is successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function(options, callback){
        function txFunction(tx) {
            var sql = "UPDATE reserve SET Name=?, typeId=?, Email=?, request=?, checkInDate=?,checkOutDate=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: update Transaction is successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function(options, callback){
        function txFunction(tx) {
            var sql = "DELETE FROM reserve WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: delete Transaction is successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function(options, callback){
        function txFunction(tx) {
            var sql = "SELECT * FROM reserve WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: select Transaction is successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function(options, callback){
        function txFunction(tx) {
            var sql = "SELECT * FROM reserve;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: selectAll Transaction is successful");
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
