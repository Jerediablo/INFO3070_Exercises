$(function () {
    $('#getbutton').click(function (e) { // click event handler
        var lastname = $('#TextBoxLastname').val();
        $('#status').text('please wait...');
        ajaxCall('Get', 'api/students/' + lastname, '')
            .done(function (data) {
                if (data.Lastname !== 'not found') {
                    $('#email').text(data.Email);
                    $('#title').text(data.Title);
                    $('#firstname').text(data.Firstname);
                    $('#phone').text(data.Phoneno);
                    $('#status').text('student found');
                } else {
                    $('#firstname').text('not found');
                    $('#email').text('');
                    $('#title').text('');
                    $('#phone').text('');
                    $('#status').text('no such student');
                }
            })
            .fail(function (jXHR, textStatus, errorThrown) {
                errorRoutine(jqXHR);
            }); // ajaxCall
    }); // button click

    function ajaxCall(type, url, data) {
        return $.ajax({ // return the promise that '$.ajax' returns
            type: type,
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            processData: true
        });
    } // ajaxCall

    function errorRoutine(jqXHR) { //common error
        if (jqXHR.responseJSON == null) {
            $('#status').text(jqXHR.responseText);
        } else {
            $('#status').text(jqXHR.responseJSON.Message);
        }
    } // error routine
}); // jQuery ready method