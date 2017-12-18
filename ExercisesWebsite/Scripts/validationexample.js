$(function () {
    // standard validators
    $("#StudentModalForm").validate({
        rules: {
            TextBoxTitle: { maxlength: 4, required: true, validTitle: true },
            TextBoxFirstname: { maxlength: 25, required: true },
            TextBoxLastname: { maxlength: 25, required: true },
            TextBoxEmail: { maxlength: 40, required: true, email: true },
            TextBoxPhone: { maxlength: 15, required: true }
        },
        errorElement: "div",
        messages: {
            TextBoxTitle: {
                required: "required 1-4 chars.", maxlength: "required 1-4 chars.",
                validTitle: "Mr. Ms. Mrs. or Dr."
            },
            TextBoxFirstname: {
                required: "required 1-25 chars.", maxlength: "required 1-25 chars."
            },
            TextBoxLastname: {
                required: "required 1-25 chars.", maxlength: "required 1-25 chars."
            },
            TextBoxPhone: {
                required: "required 1-15 chars.", maxlength: "required 1-15 chars."
            },
            TextBoxEmail: {
                required: "required 1-40 chars.", maxlength: "required 1-40 chars.",
                email: "need vaild email format"
            }
        }
    });

    // custom validator
    $.validator.addMethod("validTitle", function (value, element) { // custom rule
        return this.optional(element) || (value == "Mr." || value == "Ms." || value == "Mrs." || value == "Dr.");
    }, "");

    $("#stugetbutton").click(function (e) {  // click event handler

        var lastname = $("#TextBoxFindLastname").val();
        $("#lblstatus").text("loading....");
        $("#lblstatus").css({ "color": "black" });
        $("#empupdbutton").attr("disabled", true);

        ajaxCall("Get", "api/students/" + lastname, "")
            .done(function (data) {
                if (data.Lastname !== "not found") {
                    $("#lblstatus").text("student found!");
                    $("#lblstatus").css({ "color": "green" });
                    $("#empupdbutton").attr("disabled", false);
                    $("#TextBoxEmail").val(data.Email);
                    $("#TextBoxTitle").val(data.Title);
                    $("#TextBoxFirstname").val(data.Firstname);
                    $("#TextBoxLastname").val(data.Lastname);
                    $("#TextBoxPhone").val(data.Phoneno);
                }
                else {
                    $("#lblstatus").text("student not found!");
                    $("#lblstatus").css({ "color": "red" });
                    $("#TextBoxEmail").val("");
                    $("#TextBoxTitle").val("");
                    $("#TextBoxFirstname").val("Not Found");
                    $("#TextBoxLastname").val("");
                    $("#TextBoxPhone").val("");
                } // if
            }) // done
            .fail(function (jqXHR, textStatus, errorThrown) {
                errorRoutine(jqXHR);
            }); // ajaxCall

        $("#updateModal").modal("show");

    }); // stugetbutton click 

    $("#stuvalidatebutton").click(function () {
        if ($("#StudentModalForm").valid()) {
            $("#lblstatus").text("Data Validated by jQuery!");
            $("#lblstatus").css({ "color": "green" });
        }
        else {
            $("#lblstatus").text("fix existing problems");
            $("#lblstatus").css({ "color": "red" });
        }
        return false; // or page will return to server
    }); // stuvalidatebutton click

    $.validator.addMethod("validTitle", function (value, element) { // custom rule
        return this.optional(element) || (value == "Mr." || value == "Ms." || value == "Mrs." || value == "Dr.");
    }, "");

}); // main jQuery function

function ajaxCall(type, url, data) {
    return $.ajax({ // return the promise that `$.ajax` returns
        type: type,
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: true
    });
}

function errorRoutine(jqXHR) { // commmon error
    if (jqXHR.responseJSON === null) {
        $("#lblstatus").text(jqXHR.responseText);
    }
    else {
        $("#lblstatus").text(jqXHR.responseJSON.Message);
    }
}