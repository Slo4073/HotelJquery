
function doValidate_frmReserve(){
    var form = $("#frmReserve");
    form.validate({
        rules:{
            Name:{
                required:true,
                rangelength:[2,20]
            },
            Email:{
                required: true,
                emailcheck: true
            },
            checkInDate:{
                required: true
            },
            checkOutDate:{
                required: true,
                greaterThan: "#checkInDate"
            }
        }
    });
    return form.valid();
}

function doValidate_frmUpdateReviews(){
    var form = $("#frmEdit");
    form.validate({
        rules:{
            NameE:{
                required:true,
                rangelength:[2,20]
            },
            EmailE:{
                required: true,
                emailcheck: true
            },
            checkInDateE:{
                required: true
            },
            checkOutDateE:{
                required: true,
                greaterThan: "#checkInDateE"
            }
        }
    });
    return form.valid();
}

jQuery.validator.addMethod("emailcheck",
    function (value, element){
    var regexp = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return this.optional(element) || regexp.test(value);
    },
    "Please enter a valid email");

jQuery.validator.addMethod("greaterThan",
    function(value, element, params) {

        if (!/Invalid|NaN/.test(new Date(value))) {
            return new Date(value) > new Date($(params).val());
        }

        return isNaN(value) && isNaN($(params).val())
            || (Number(value) > Number($(params).val()));
    },'Must be greater than {0}.');
