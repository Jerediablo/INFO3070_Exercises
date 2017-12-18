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
                    $('#ImageHolder').html('<img height="120" width="110" src="data:image/png;base64,' + data.Picture64 + '"/>');
                    $('#status').text('student found');
                    localStorage.setItem('Id', data.Id);
                    localStorage.setItem('DivisionId', data.DivisionId);
                    localStorage.setItem('Timer', data.Timer);
                    localStorage.setItem('StudentPicture', data.Picture64);
                } else {
                    $('#TextBoxFirstname').val('not found');
                    $('#TextBoxLastname').val('');
                    $('#TextBoxEmail').val('');
                    $('#TextBoxTitle').val('');
                    $('#TextBoxPhoneno').val('');
                    $('#status').text('no such student');
                    $('#ImageHolder').html('');
                }
            })
            .fail(function (jXHR, textStatus, errorThrown) {
                errorRoutine(jqXHR);
            }); // ajaxCall
        $("#theModal").modal("toggle");
    }); // button click

    $("input:file").change(() => {
        var reader = new FileReader();
        var file = $('#fileUpload')[0].files[0];

        if (file) {
            reader.readAsBinaryString(file);
        }

        reader.onload = function (readerEvt) {
            // get binary data then convert to encoded string 
            var binaryString = reader.result;
            var encodedString = btoa(binaryString);
            localStorage.setItem('StudentPicture', encodedString);
        }
    });

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
        if (localStorage.getItem('StudentPicture')) {
            stu.Picture64 = localStorage.getItem('StudentPicture');
        }

        ajaxCall('put', 'api/students', stu)
            .done(function (data) {
                $("myModal").modal("toggle");
                $('#status').text(data);
                if (data.indexOf('not') === -1) {
                    $('#ImageHolder').html('<img height="120" width="110" src="data:image/png;base64,'
                        + localStorage.getItem('StudentPicture') + '"/>');
                }
            })
            .fail(function (jXHR, textStatus, errorThrown) {
                $("myModal").modal("toggle");
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