$(function () { // studentupdate.js
    $('#getbutton').click(function (e) { // click event handler
        var lastname = $('#TextBoxFindLastname').val();
        $('#status').text('obtaining data please wait...');
        ajaxCall('Get', 'api/students/' + lastname, '')
            .done(function (data) {
                if (data.Lastname !== 'not found') {
                    $('#TextBoxEmail').val(data.Email);
                    $('#TextBoxTitle').val(data.Title);
                    $('#TextBoxFirstname').val(data.Firstname);
                    $('#TextBoxLastname').val(data.Lastname);
                    $('#TextBoxPhoneno').val(data.Phoneno);
                    $('#status').text('student found');
                    localStorage.setItem('Id', data.Id);
                    localStorage.setItem('DivisionId', data.DivisionId);
                    localStorage.setItem('Timer', data.Timer);
                } else {
                    $('#TextBoxFirstname').val('not found');
                    $('#TextBoxLastname').val('');
                    $('#TextBoxEmail').val('');
                    $('#TextBoxTitle').val('');
                    $('#TextBoxPhoneno').val('');
                    $('#status').text('no such student');
                }
            })
            .fail(function (jXHR, textStatus, errorThrown) {
                errorRoutine(jqXHR);
            }); // ajaxCall
        $("#theModal").modal("toggle");
    }); // button click

    $('#updatebutton').click(function (e) { // click event handler
        stu = new Object();
        stu.Title = $("#TextBoxTitle").val();
        stu.Firstname = $("#TextBoxFirstname").val();
        stu.Lastname = $("#TextBoxLastname").val();
        stu.Phoneno = $("#TextBoxPhoneno").val();
        stu.Email = $("#TextBoxEmail").val();
        stu.Id = localStorage.getItem("Id");
        stu.DivisionId = localStorage.getItem("DivisionId");
        stu.Timer = localStorage.getItem("Timer");
        ajaxCall('put', 'api/students', stu)
            .done(function (data) {
                $('#status').text(data);
            })
            .fail(function (jXHR, textStatus, errorThrown) {
                errorRoutine(jqXHR);
            });
        return false; //make sure to return false for click or REST calls get cancelled
    }); // update button click

    function ajaxCall(type, url, data) {
        return $.ajax({ // return the promise that '$.ajax' returns
            type: type,
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            processData: true
        });
    }

    function errorRoutine(jqXHR) { // common error
        if (jqXHR.responseJSON == null) {
            $('#status').text(jqXHR.responseText);
        }
        else {
            $('status').text(jqXHR.responseJSON.Message);
        }
    }   // errorRoutine
}); // jQuery ready method