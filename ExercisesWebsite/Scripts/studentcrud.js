$(function () {     // studentadd.js

    getAll(''); // first grab the data from the server

    $("#srch").keyup(function () {
        filterData();
    }); // srch field key press

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

    $('#deletebutton').click(function () {
        var deleteStudent = confirm('Really delete this student?');
        if (deleteStudent) {
            _delete();
            return !deleteStudent;
        }
        else
            return deleteStudent;
    }); // deletebutton click

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
                loadDivisionDDL(student.DivisionId);
                return false;
            } /*else {
                $("#status").text("no student found");
            }*/
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
    function buildStudentList(data, allstudents) {
        $('#studentList').empty();
        div = $('<div class="list-group"><div>' +
            '<span class="col-xs-4 h3">Title</span>' +
            '<span class="col-xs-4 h3">First</span>' +
            '<span class="col-xs-4 h3">Last</span>' +
            '</div>');
        div.appendTo($('#studentList'))

        if (allstudents) {
            localStorage.setItem('allstudents', JSON.stringify(data));
        }

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
                buildStudentList(data, true);
                if (msg === '')
                    $('#status').text('Students Loaded');
                else
                    $('#status').text(msg + ' - Students Loaded');
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                errorRoutine(jqXHR);
            });

        ajaxCall('Get', 'api/divisions', '')
            .done(function (data) {
                localStorage.setItem('alldivisions', JSON.stringify(data));
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert('Error');
            });
    } // getAll

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
        loadDivisionDDL(-1);
    }

    function add() {
        stu = new Object();
        stu.Title = $('#TextBoxTitle').val();
        stu.Firstname = $('#TextBoxFirstname').val();
        stu.Lastname = $('#TextBoxLastname').val();
        stu.Phoneno = $('#TextBoxPhone').val();
        stu.Email = $('#TextBoxEmail').val();
        stu.DivisionId = $('#ddlDivs').val();

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
        stu.DivisionId = $('#ddlDivs').val();
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

    function _delete() {
        ajaxCall('Delete', 'api/students/' + localStorage.getItem('Id'), '')
            .done(function (data) {
                getAll(data);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {

            });
        $('#theModal').modal('toggle');
    }   // _delete

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

    function loadDivisionDDL(studiv) {
        html = '';
        $('#ddlDivs').empty();
        var alldivisions = JSON.parse(localStorage.getItem('alldivisions'));
        $.each(alldivisions, function () {
            html += '<option value="' + this['Id'] + '">' + this['Name'] + '</option>';
        });
        $('#ddlDivs').append(html);
        $('#ddlDivs').val(studiv);
    } //loadDivisionDDL

    function filterData() {
        filteredData = [];
        allData = JSON.parse(localStorage.getItem('allstudents'));

        $.each(allData, function (n, i) {
            if (~i.Lastname.indexOf($("#srch").val())) { // same as i.Lastname.indexOf($("#srch").val()) > 1 
                filteredData.push(i);
            }
        });
        buildStudentList(filteredData, false);
    } // filterData

    function errorRoutine(jqXHR) { // common error
        if (jqXHR.responseJSON === null) {
            $('#status').text(jqXHR.responseText);
        }
        else {
            $('#status').text(jqXHR.responseText);
        }
    }   // errorRoutine
});  // jQuery ready method