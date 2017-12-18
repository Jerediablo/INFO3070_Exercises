$(function () {     // studentadd.js

    getAll(''); // first grab the data from the server

    // click event handler for the student list
    $('#studentList').click(function (e) {  //click on any row
        if (!e) e = window.event;
        var Id = e.target.parentNode.id;
        if (Id === 'studentList' || Id === '') {
            Id = e.target.id;   // clicked on row somewhere else
        }

        var data = JSON.parse(localStorage.getItem('allstudents'));
        clearModalFields();

        // now figure out if we're doing an add or update/delete?
        if (Id === '0') {
            setupForAdd();
        } else {
            setupForUpdate(Id, data);
        }
    });

    $('#actionbutton').click(function () {
        if ($('#actionbutton').val() === 'Update') {
            update();
        }
        else {
            add();
        }
        return false;
    }); // actionbutton click

    function setupForUpdate(Id, data) {
        $('#actionbutton').val('Update');
        $('#modaltitle').html('<h4>Student Update</h4>');
        $('#deletebutton').show();

        $.each(data, function (index, student) {
            if (student.Id === parseInt(Id)) {
                $('#TextBoxTitle').val(student.Title);
                $('#TextBoxFirstname').val(student.Firstname);
                $('#TextBoxLastname').val(student.Lastname);
                $('#TextBoxPhone').val(student.Phoneno);
                $('#TextBoxEmail').val(student.Email);
                localStorage.setItem('Id', student.Id);
                localStorage.setItem('DivisionId', student.DivisionId);
                localStorage.setItem('Timer', student.Timer);
                return false;
            } else {
                $("#status").text("no student found");
            }
        });
        $("#theModal").modal("toggle");
    }

    function setupForAdd() {
        clearModalFields();
        $('#actionbutton').val('Add');
        $('#modaltitle').html('<h4>Add New Student</h4>');
        $('#deletebutton').hide();
        $('#theModal').modal('toggle');
    }

    // build the list
    function buildStudentList(data) {
        $('#studentList').empty();
        div = $('<div class="list-group"><div>' +
            '<span class="col-xs-4 h3">Title</span>' +
            '<span class="col-xs-4 h3">First</span>' +
            '<span class="col-xs-4 h3">Last</span>' +
            '</div>');
        div.appendTo($('#studentList'))
        localStorage.setItem('allstudents', JSON.stringify(data));

        btn = $('<button class="list-group-item" id="0">...Click to add student</button>');
        btn.appendTo(div);

        $.each(data, function (index, stu) {
            btn = $('<button class="list-group-item" id="' + stu.Id + '">');
            btn.html(
                '<span class="col-xs-4" id="studenttitle' + stu.Id + '">' + stu.Title + '</span>' +
                '<span class="col-xs-4" id="studentfname' + stu.Id + '">' + stu.Firstname + '</span>' +
                '<span class="col-xs-4" id="studentlastname' + stu.Id + '">' + stu.Lastname + '</span>'
            );
            btn.appendTo(div);
        }); // each
    } // buildStudentList

    // get all students
    function getAll(msg) {
        $('#status').text('Finding Student Information...');

        ajaxCall('Get', 'api/students', '')
            .done(function (data) {
                buildStudentList(data);
                if (msg === '')
                    $('#status').text('Students Loaded');
                else
                    $('#status').text(msg + ' - Students Loaded');
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                errorRoutine(jqXHR);
            });
    } /// getAll

    function clearModalFields() {
        $('#TextBoxTitle').val('');
        $('#TextBoxFirstname').val('');
        $('#TextBoxLastname').val('');
        $('#TextBoxPhone').val('');
        $('#TextBoxEmail').val('');
        $('#modalstatus').text('');
        localStorage.removeItem('Id');
        localStorage.removeItem('DivisionId');
        localStorage.removeItem('Timer');
    }

    function add() {
        stu = new Object();
        stu.Title = $('#TextBoxTitle').val();
        stu.Firstname = $('#TextBoxFirstname').val();
        stu.Lastname = $('#TextBoxLastname').val();
        stu.Phoneno = $('#TextBoxPhone').val();
        stu.Email = $('#TextBoxEmail').val();
        stu.DivisionId = 10; // hardcode for now, add a drop down later

        ajaxCall('Post', 'api/students', stu)
            .done(function (data) {
                getAll(data);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                errorRoutine(jqXHR);
            });
        $('#theModal').modal('toggle');
        return false;
    } // add

    // update button click event handler
    function update() {
        stu = new Object();
        stu.Title = $("#TextBoxTitle").val();
        stu.Firstname = $("#TextBoxFirstname").val();
        stu.Lastname = $("#TextBoxLastname").val();
        stu.Phoneno = $("#TextBoxPhone").val();
        stu.Email = $("#TextBoxEmail").val();
        stu.Id = localStorage.getItem("Id");
        stu.DivisionId = localStorage.getItem("DivisionId");
        stu.Timer = localStorage.getItem('Timer');

        ajaxCall('put', 'api/students', stu)
            .done(function (data) {
                getAll(data);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                errorRoutine(jqXHR);
            });
        $("#theModal").modal("toggle");
        return false; // make sure to return false for click or REST calls
    }// updatebutton click

    // call ASP.Net WEB API server
    function ajaxCall(type, url, data) {
        return $.ajax({ //return the promise that `$.ajax` returns
            type: type,
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            processData: true
        });
    }   // ajaxCall

    function errorRoutine(jqXHR) { // common error
        if (jqXHR.responseJSON === null) {
            $('#status').text(jqXHR.responseText);
        }
        else {
            $('#status').text(jqXHR.responseText);
        }
    }   // errorRoutine
});  // jQuery ready method