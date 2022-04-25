function clearDatabase(){
    var txt;
    if (confirm("Really want to clear database?")) {
        DB.dropTables();
        alert("Database cleared: All tables dropped");
    } else {

    }

}

function ReserveRoom(){
    if(doValidate_frmReserve()){
        console.log("Reserve form is valid");
        let name = $("#Name").val();
        let type = $("#typeId").val();
        let email = $("#Email").val();
        let request = $("#request").val();
        let checkInDate = $("#checkInDate").val();
        let checkOutDate = $("#checkOutDate").val();

        let options = [name, type, email, request,checkInDate,checkOutDate];

        function callback() {
            alert("New room is booked");
        }

        Reserve.insert(options, callback);
    }
    else{
        console.log("Reserve form is invalid");
    }
}
function updateETypesDropdown(){

    var options = [];

    function callback(tx, results) {
        console.info("Records selected successfully");
        var htmlCode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var id = row['id'];
            var name = row['name'];
            console.info(`id: ${id} name: ${name}`);
            htmlCode += `<select>
                            <option value="${row['id']}" selected>${row['name']}
                            </option>
                        </select>`
        }
        var dm = $("#typeIdE");
        dm = dm.html(htmlCode);
        dm.selectmenu("refresh");
    }
    Type.selectAll(options, callback);
}

function updateTypesDropdown(){

    var options = [];

    function callback(tx, results) {
        console.info("Records selected successfully");
        var htmlCode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var id = row['id'];
            var name = row['name'];
            console.info(`id: ${id} name: ${name}`);
            htmlCode += `<select>
                            <option value="${row['id']}" selected>${row['name']}
                            </option>
                        </select>`
        }
        var dm = $("#typeId");
        dm = dm.html(htmlCode);
        dm.selectmenu("refresh");
    }
    Type.selectAll(options, callback);
}

function getRooms(){
    var options = [];

    function callback(tx, results) {
        console.info("Records selected successfully");
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var id = row['id'];
            console.log(id);
            var name = row['Name'];
            var Email = row['Email'];
            var type = row['typeId'];
            var inDate = row['checkInDate'];

            if (type === 1){
                type = "Guest"
            }
            if (type === 2){
                type = "King"
            }
            if (type === 3){
                type = "Queen"
            }
            htmlCode += `<li data-role="list-divider">Checkin Date: ${inDate}</li>
            <li><a data-role="button" data-row-id=${row['id']} href="#ModifyPage" data-transition="slide">
                <h2>Name: ${name}</h2>
                <p><strong>Email: ${Email}</strong></p>
                <p>Room Type: ${type}</p>
            </a></li>`
        }

        var lv = $("#ViewFeedback");
        lv = lv.html(htmlCode);
        lv.listview("refresh");
        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop("href", "#pageDetail");
        }
        $("#ViewFeedback a").on("click", clickHandler);
    }
    Reserve.selectAll(options, callback);
}

function showCurrentRooms() {
    var id = localStorage.getItem("id");
    let htmlCode = "";
    var options = [id];
    console.log(id);
    function callback(tx, results) {
        console.info("Record selected successfully");
        let row = results.rows[0];
        var Name = row['Name'];
        console.log(Name);
        let Email = row['Email'];
        let request = row['request'];
        let inDate = row['checkInDate'];
        let outDate = row['checkOutDate'];
        let typeId = row['typeId'];


        $("#NameE").val(Name);
        $("#EmailE").val(Email);
        $("#requestE").val(request);
        $("#checkInDateE").val(inDate);
        $("#checkOutDateE").val(outDate);
        $("#typeIdE").val(typeId);

    }
    Reserve.select(options, callback);
}

function updateRoom(){
    if(doValidate_frmUpdateReviews()){
        console.log("update form is valid");

        let id = localStorage.getItem("id");

        var name = $("#NameE").val();
        let typeId = $("#typeIdE").val();
        var email = $("#EmailE").val();
        let request = $("#requestE").val();
        let inDate = $("#checkInDateE").val();
        let outDate = $("#checkOutDateE").val();

        let options = [name, typeId, email, request,inDate,outDate,id];
        console.info(options);
        function callback() {
            alert("Room updated successfully");
        }

        Reserve.update(options, callback);
    }
    else{
        console.log("update form is invalid");
    }

}

function deleteRoom() {
    var id = localStorage.getItem("id");

    var options = [id];

    function callback() {
        console.info("Record deleted successfully");
        alert("Room Booking Cancelled")
        $(location).prop("href", "#ViewRoomPage");
    }

    Reserve.delete(options, callback);
}

