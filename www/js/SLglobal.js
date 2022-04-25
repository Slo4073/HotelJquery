function ReserveBtnClick() {
    ReserveRoom();
}

function dropTableClick() {
    clearDatabase()
}

function viewPageShow() {
    getRooms();
}


function LocalBtnClick() {
    localStorage.clear();
}

function EditBtnClick() {
    updateRoom();
}

function DeleteBtnClick() {
    deleteRoom();
}
$(document).on("pageshow","#BookPage",function(){
    updateTypesDropdown();
    $('#frmReserve').trigger("reset");
});

$(document).on("pageshow","#ModifyPage",function(){
    updateETypesDropdown();
    $('#frmEdit').trigger("reset");
});

function btnCapturePhoto_click() {
    capturePhoto();
}
function btnLoadFromLibrary_click() {
    loadFromPhotoLibrary();
}

function init() {
    $("#ReserveBtn").on("click",ReserveBtnClick);
    $("#EditBtn").on("click",EditBtnClick);
    $("#DeleteBtn").on("click",DeleteBtnClick);
    $("#btnClearDatabase").on("click",dropTableClick);
    $("#ViewRoomPage").on("pageshow", viewPageShow);
    $("#ModifyPage").on("pageshow", showCurrentRooms);
    $("#btnClearLocalStorage").on("click",LocalBtnClick);
    $("#btnCapturePhoto").on("click",btnCapturePhoto_click);
    $("#btnLoadFromLibrary").on("click", btnLoadFromLibrary_click);
}

function initSLDB() {
    try{
        DB.createDatabase();
        if (db) {
            console.info("Creating tables..");
            DB.createTables();
        }
        else{
            console.error("Cannot create tables: database does not exist!");
        }
    } catch(e){
        console.error("Error: (Fatal) Error in initDB(), can not proceed.");
    }
}

$(document).ready(function () {
    init();
    initSLDB();
});
