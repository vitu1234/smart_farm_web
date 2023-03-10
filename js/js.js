// register an account
$("#user_register_form").on('submit', function (e) {
    var form_data = $(this).serialize();
    $("#register_btn").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Registering...');
    $.ajax({ //make ajax request to cart_process.php
        headers: {
            "accept": "application/json",
        },
        url: api + "api/register/",
        type: "POST",
        // crossDomain: true,
        // xhrFields: { withCredentials: true },
        dataType: "json", //expect json value from server
        data: form_data
    }).done(function (response) { //on Ajax success
        // $("#btn_add").text('Register');
        //

        var form_data2 = form_data + '&user_id=' + response.id
        if (response.error == false) {
            $.ajax({ //make ajax request to cart_process.php
                headers: {
                    "accept": "application/json",
                },
                url: api + "api/user/register_farm",
                type: "POST",
                // crossDomain: true,
                // xhrFields: { withCredentials: true },
                dataType: "json", //expect json value from server
                data: form_data2
            }).done(function (response) { //on Ajax success
                $("#register_btn").text('Register');
                // $("#user_register_form")[0].reset();
                if (response.error == false) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Registered successfully'
                    })
                    $("#user_register_form")[0].reset();
                    setTimeout(function () {
                        window.location.href = 'login.php';
                    }, 1500);

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }

            }).fail(function (jqXHR, exception) {
                var msg = '';
                $("#register_btn").text('Register');
                if (jqXHR.status === 0) {
                    msg = 'Network or API error.\n Verify Network.';
                } else if (jqXHR.status == 404 || jqXHR.status == 400) {
                    msg = 'Bad request. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = '[Error code: ' + jqXHR.status + '] Uncaught Error.\n' + jqXHR.responseJSON.detail;
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: msg,
                })
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }

    }).fail(function (jqXHR, exception) {

        var msg = '';
        $("#register_btn").text('Register');
        if (jqXHR.status === 0) {
            msg = 'Network or API error.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Bad request. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = '[Error code: ' + jqXHR.status + '] Uncaught Error.\n' + jqXHR.responseJSON.detail;
        }

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
        })
    });


    e.preventDefault();
    e.stopImmediatePropagation();
});

// login user
$("#login_form").on('submit', function (e) {
    var form_data = $(this).serialize();
    $("#login_btn").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Background check...');
    $.ajax({ //make ajax request to cart_process.php
        headers: {
            "accept": "application/json",
        },
        url: api + "api/login/",
        type: "POST",
        // crossDomain: true,
        // xhrFields: { withCredentials: true },
        dataType: "json", //expect json value from server
        data: form_data
    }).done(function (response) { //on Ajax success
        // $("#btn_add").text('Register');
        // $("#user_register_form")[0].reset();
        $("#login_btn").text('Sign in');
        $("#login_form")[0].reset();
        if (response.error == false) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
            })
            $.post("process/session.php", response);
            setTimeout(function () {
                window.location.href = 'dashboard.php';
            }, 1000);

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }

    }).fail(function (jqXHR, exception) {
        var msg = '';
        $("#login_btn").text('Sign in');
        if (jqXHR.status === 0) {
            msg = 'Network or API error.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Bad request. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = '[Error code: ' + jqXHR.status + '] \n' + jqXHR.responseJSON.detail;
        }

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
        })
    });


    e.preventDefault();
    e.stopImmediatePropagation();
})

//user devices on dashboard
function get_all_user_devices_dashboard(token) {
    Swal.showLoading()
    $.ajax({
        headers: {
            "accept": "application/json",
            "Authorization": "JWT " + token
        },
        url: api + "api/user/devices",
        method: 'GET',
        success: function (response) {
            Swal.close()
            if (response.error == false) {
                user_devices = response.user_devices
                if (user_devices.length > 0) {
                    var cards = ''
                    $.each(user_devices, function (key, value) {
                            switch_on = ''
                            switch_off = ''
                            if (value.switch_status == true) {
                                switch_on = 'checked'
                                switch_off = ''
                            } else {
                                switch_off = 'checked'
                                switch_on = ''
                            }
                            card = '<div class="col-md-3">\n' +
                                '                        <div class="card" style="width: 100%;">\n' +
                                '                            <div class="card-body">\n' +
                                '                                <a href="device_settings.php?device_id=' + value.id + '" class="float-end"><strong>Setting</strong></a>\n' +
                                '                                <h5 class="card-title"><strong>' + value.device_name + '</strong></h5>\n' +
                                '                                <h6 class="card-subtitle mb-2 text-muted">' + value.farm_name + '</h6>\n' +
                                '                                <p class="card-text">Temp: ' + value.temperature + '??C <strong>|</strong> Humidity: ' + value.humidity + '% <strong>|</strong> Soil\n' +
                                '                                    Moisture: ' + value.soil_moisture + '%</p>\n' +
                                '\n' + '<p class="mt-1"><small><em>Last record: ' + value.timestamp + '</em></small></p>' +
                                '                                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">\n' +


                                '                                    <input value="true" onclick="set_device_action(\'' + value.device_id + '\')" type="radio" class="btn-check" name="btnradio' + value.device_id + '" id="btnradio1' + value.device_id + '"\n' +
                                '                                           autocomplete="off" ' + switch_on + '>\n' +
                                '                                    <label class="btn btn-outline-secondary" for="btnradio1' + value.device_id + '">ON</label>\n' +
                                '\n' +


                                '                                    <input value="false" onclick="set_device_action(\'' + value.device_id + '\')" type="radio" class="btn-check" name="btnradio' + value.device_id + '" id="btnradio2' + value.device_id + '"\n' +
                                '                                           autocomplete="off" ' + switch_off + '>\n' +
                                '                                    <label class="btn btn-outline-danger" for="btnradio2' + value.device_id + '">OFF</label>\n' +
                                '\n' +

                                '                                </div>\n' +
                                '                                <br/><i><small class="text-secondary"><strong>NB:</strong> remember to turn off pump\n' +
                                '                                        after using</small></i>\n' +
                                '                            </div>\n' +
                                '                        </div>\n' +
                                '                    </div>'
                            cards += card
                        }
                    );
                    $("#devices").html(cards)
                } else {
                    $("#devices").html('<div class="col-md-3"><p class="text-dark">No devices found for your account, please add devices</p> <a class="btn btn-outline-danger btn-md mt-2"  href="unclaimed_devices.php">here</a></div>');
                }

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There\'s a problem loading data from the server!',
                })
            }


        },
        error: function () {
            Swal.close()
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }).fail(function (jqXHR, exception) {
        Swal.close()
        var msg = '';
        $("#login_btn").text('Sign in');
        if (jqXHR.status === 0) {
            msg = 'Network or API error.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Bad request [404]';
        } else if (jqXHR.status == 401) {
            msg = 'Bad request [Error code: 401]\n' + jqXHR.responseJSON.detail;
            setTimeout(function () {
                window.location.href = 'login.php';
            }, 1500);
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = '[Error code: ' + jqXHR.status + '] \n' + jqXHR.responseJSON.detail;
        }

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
        })
    });
    ;
}

//user devices on devices page
function get_all_user_devices(token) {
    Swal.showLoading()
    $.ajax({
        headers: {
            "accept": "application/json",
            "Authorization": "JWT " + token
        },
        url: api + "api/user/devices",
        method: 'GET',
        success: function (response) {
            Swal.close()
            if (response.error == false) {
                user_devices = response.user_devices
                if (user_devices.length > 0) {
                    var rows = ''
                    $.each(user_devices, function (key, value) {

                            if (value.address == '') {
                                address = '--'
                            } else {
                                address = value.address
                            }

                            if (value.description == '' || value.description == null) {
                                description = '--'
                            } else {
                                description = value.description
                            }
                            row = '<tr>\n' +
                                '                        <td>' + value.device_id + '</td>\n' +
                                '                        <td>' + value.device_name + '</td>\n' +
                                '                        <td>' + value.farm_name + '</td>\n' +
                                '                        <td>' + address + '</td>\n' +
                                '                        <td>' + description + '</td>\n' +
                                '                        <td>\n' +
                                '                            <div class="dropdown">\n' +
                                '                                <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle"\n' +
                                '                                        data-bs-toggle="dropdown" aria-expanded="false">\n' +
                                '                                    <span data-feather="more-horizontal" class="align-text-bottom"></span>\n' +
                                '                                    Action\n' +
                                '                                </button>\n' +
                                '                                <ul class="dropdown-menu">\n' +
                                '                                    <li><a class="dropdown-item text-warning" href="device_edit.php?device_id=' + value.id + '">\n' +
                                '                                        <span data-feather="edit-2" class="align-text-bottom"></span> Modify\n' +
                                '                                    </a></li>\n' +
                                '                                    <li><a onclick="deleteDevice(\'' + value.id + '\')" class="dropdown-item text-danger" href="#">\n' +
                                '                                        <span data-feather="trash-2" class="align-text-bottom"></span> Delete\n' +
                                '                                    </a></li>\n' +
                                '                                </ul>\n' +
                                '                            </div>\n' +
                                '                        </td>\n' +
                                '                    </tr>'
                            rows += row
                        }
                    );

                    $("#table_body").html(rows);
                    $("table").DataTable({
                        order: [0, 'desc']
                    });
                } else {
                    $("table").html('<div class="col-md-3"><p class="text-dark">No devices found for your account, please add first</p> <a class="btn btn-outline-danger btn-md mt-2"  href="unclaimed_devices.php">here</a></div>');
                }

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There\'s a problem loading data from the server!',
                })
            }


        },
        error: function () {
            Swal.close()
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }).fail(function (jqXHR, exception) {
        Swal.close()
        var msg = '';
        $("#login_btn").text('Sign in');
        if (jqXHR.status === 0) {
            msg = 'Network or API error.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Bad request [404]';
        } else if (jqXHR.status == 401) {
            msg = 'Bad request [Error code: 401]\n' + jqXHR.responseJSON.detail;
            setTimeout(function () {
                window.location.href = 'login.php';
            }, 1500);
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = '[Error code: ' + jqXHR.status + '] \n' + jqXHR.responseJSON.detail;
        }

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
        })
    });
    ;
}


//turn on/off devices
function set_device_action(device_id) {
    Swal.showLoading()
    var checked = $('input[name=btnradio' + device_id + ']:checked').val()
    var form_data = {"pump_action": checked, "pump_device_id": device_id};


    $.ajax({ //make ajax request to cart_process.php
        headers: {
            "accept": "application/json",
            "Authorization": "JWT " + token
        },
        url: api + "api/switch_by_device",
        type: "POST",
        // crossDomain: true,
        // xhrFields: { withCredentials: true },
        dataType: "json", //expect json value from server
        data: form_data
    }).done(function (response) { //on Ajax success
        Swal.close()

        var action = ''
        if (checked == 'true') {
            action = 'turned on'
        } else {
            action = "turned off"
        }

        if (response.error == false) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Device has been ' + action
            })
            setTimeout(function () {
                // window.location.href = 'dashboard.php';
            }, 1500);

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }

    }).fail(function (jqXHR, exception) {
        Swal.close();
        var msg = '';
        if (jqXHR.status === 0) {
            msg = 'Network or API error.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Bad request [404]';
        } else if (jqXHR.status == 401) {
            msg = 'Bad request [Error code: 401]\n' + jqXHR.responseJSON.detail;
            setTimeout(function () {
                window.location.href = 'login.php';
            }, 1500);
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = '[Error code: ' + jqXHR.status + '] \n' + jqXHR.responseJSON.detail;
        }

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
        })
    });
}

//user farms
function get_all_user_farms(token) {
    Swal.showLoading()
    $.ajax({
        headers: {
            "accept": "application/json",
            "Authorization": "JWT " + token
        },
        url: api + "api/user/farms",
        method: 'GET',
        success: function (response) {
            Swal.close()
            if (response.error == false) {
                farms = response.user_farms

                //check if listing farms or adding device
                if ($("#add_device_form").length > 0) {
                    var li = '<option selected>-Select-</option>'
                    $.each(farms, function (key, value) {

                            item = '<option value="' + value.id + '">' + value.farm_name + '</option>'
                            li += item
                        }
                    );
                    $("#dropdown_menu_farms").html(li);
                } else {

                    if (farms.length > 0) {
                        var rows = ''
                        $.each(farms, function (key, value) {

                                if (value.address == '') {
                                    address = '--'
                                } else {
                                    address = value.address
                                }
                                row = '<tr>\n' +
                                    '                        <td>' + value.farm_name + '</td>\n' +
                                    '                        <td>' + value.devices_total + '</td>\n' +
                                    '                        <td>' + address + '</td>\n' +
                                    '                        <td>\n' +
                                    '                            <div class="dropdown">\n' +
                                    '                                <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle"\n' +
                                    '                                        data-bs-toggle="dropdown" aria-expanded="false">\n' +
                                    '                                    <span data-feather="more-horizontal" class="align-text-bottom"></span>\n' +
                                    '                                    Action\n' +
                                    '                                </button>\n' +
                                    '                                <ul class="dropdown-menu">\n' +
                                    '                                    <li><a class="dropdown-item" href="farm_devices.php?farm_id=' + value.id + '">\n' +
                                    '                                        <span data-feather="wifi" class="align-text-bottom"></span> Devices\n' +
                                    '                                    </a></li>\n' +
                                    '                                    <li><a class="dropdown-item text-warning" href="farm_edit.php?farm_id=' + value.id + '">\n' +
                                    '                                        <span data-feather="edit-2" class="align-text-bottom"></span> Modify\n' +
                                    '                                    </a></li>\n' +
                                    '                                    <li><a onclick="deleteFarm(\'' + value.id + '\')" class="dropdown-item text-danger" href="#">\n' +
                                    '                                        <span data-feather="trash-2" class="align-text-bottom"></span> Delete\n' +
                                    '                                    </a></li>\n' +
                                    '                                </ul>\n' +
                                    '                            </div>\n' +
                                    '                        </td>\n' +
                                    '                    </tr>'
                                rows += row
                            }
                        );

                        $("#table_body").html(rows);
                        $("table").DataTable({
                            order: [0, 'desc']
                        });
                    } else {
                        $("table").html('<div class="col-md-3"><p class="text-dark">No farms found for your account, please add first</p> </div>');
                    }
                }

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There\'s a problem loading data from the server!',
                })
            }


        },
        error: function () {
            Swal.close()
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }).fail(function (jqXHR, exception) {
        Swal.close()
        var msg = '';
        $("#login_btn").text('Sign in');
        if (jqXHR.status === 0) {
            msg = 'Network or API error.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Bad request [404]';
        } else if (jqXHR.status == 401) {
            msg = 'Bad request [Error code: 401]\n' + jqXHR.responseJSON.detail;
            setTimeout(function () {
                window.location.href = 'login.php';
            }, 1500);
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = '[Error code: ' + jqXHR.status + '] \n' + jqXHR.responseJSON.detail;
        }

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
        })
    });
    ;
}

//delete farm
function deleteFarm(id) {
    alert('will delete farm: ' + id)
}

//delete device

function deleteDevice(id) {
    alert('will delete device: ' + id)
}


//get all unclaimed devices
function get_unclaimed_devices() {
    Swal.showLoading()
    $.ajax({
        headers: {
            "accept": "application/json",
        },
        url: api + "api/devices/unclaimed",
        method: 'GET',
        success: function (response) {
            Swal.close()
            if (response.error == false) {
                unclaimed_devices = response.unclaimed_devices
                if (unclaimed_devices.length > 0) {

                    var rows = ''
                    $.each(unclaimed_devices, function (key, value) {

                            row = '<tr>\n' +
                                '                        <td>' + value.flotta_egdedevice_id + '</td>\n' +
                                '                        <td>' + value.mode + '</td>\n' +
                                '                        <td>' + value.device_type + '</td>\n' +
                                '<td>\n' +
                                '   <button onclick="setUnclaimedDevice(\'' + value.flotta_egdedevice_id + '\', \'' + value.device_type + '\')" type="button" class="btn btn-sm btn-outline-secondary "\n' +
                                '           data-bs-toggle="modal"\n' +
                                '          data-bs-target="#staticBackdrop">\n' +
                                '       <span data-feather="check" class="align-text-bottom"></span>\n' +
                                '       Select\n' +
                                '</button>\n' +
                                '</td>\n' +
                                '</tr>'
                            rows += row
                        }
                    );

                    $("#table_body").html(rows);
                    $("table").DataTable({
                        order: [0, 'desc']
                    });
                } else {
                    $("table").html('<div class="col-md-3"><p class="text-dark">No unclaimed devices found</p> /div>');
                }

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There\'s a problem loading data from the server!',
                })
            }


        },
        error: function () {
            Swal.close()
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }).fail(function (jqXHR, exception) {
        Swal.close()
        var msg = '';
        $("#login_btn").text('Sign in');
        if (jqXHR.status === 0) {
            msg = 'Network or API error.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Bad request [404]';
        } else if (jqXHR.status == 401) {
            msg = 'Bad request [Error code: 401]\n' + jqXHR.responseJSON.detail;
            setTimeout(function () {
                window.location.href = 'login.php';
            }, 1500);
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = '[Error code: ' + jqXHR.status + '] \n' + jqXHR.responseJSON.detail;
        }

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
        })
    });
    ;
}

//modding to go to add device
function setUnclaimedDevice(dev_id,dev_type) {
    $("#dev_id").val(dev_id)
    $("#dev_type").val(dev_type)
}

//add farm
$("#addFarmForm").on('submit', function (e) {
    var form_data = $(this).serialize();
    $("#add_farm_btn").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Saving...');
    $.ajax({ //make ajax request to cart_process.php
        headers: {
            "accept": "application/json",
            "Authorization": "JWT " + token
        },
        url: api + "api/user/add_farm",
        type: "POST",
        // crossDomain: true,
        // xhrFields: { withCredentials: true },
        dataType: "json", //expect json value from server
        data: form_data
    }).done(function (response) { //on Ajax success
        $("#add_farm_btn").text('Save Farm');
        // $("#user_register_form")[0].reset();
        if (response.error == false) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Saved successfully'
            })
            $("#addFarmForm")[0].reset();
            setTimeout(function () {
                location.reload()
            }, 1500);

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }

    }).fail(function (jqXHR, exception) {
        var msg = '';
        $("#add_farm_btn").text('Register');
        if (jqXHR.status === 0) {
            msg = 'Network or API error.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Bad request [404]';
        } else if (jqXHR.status == 401) {
            msg = 'Bad request [Error code: 401]\n' + jqXHR.responseJSON.detail;
            setTimeout(function () {
                window.location.href = 'login.php';
            }, 1500);
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = '[Error code: ' + jqXHR.status + '] \n' + jqXHR.responseJSON.detail;
        }

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
        })
    });


    e.preventDefault();
    e.stopImmediatePropagation();
});

//add device
$("#add_device_form").on('submit', function (e) {
    var form_data = $(this).serialize();
    $("#add_device_btn").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Claiming device...');
    $.ajax({ //make ajax request to cart_process.php
        headers: {
            "accept": "application/json",
            "Authorization": "JWT " + token
        },
        url: api + "api/user/add_device",
        type: "POST",
        // crossDomain: true,
        // xhrFields: { withCredentials: true },
        dataType: "json", //expect json value from server
        data: form_data
    }).done(function (response) { //on Ajax success
        $("#add_device_btn").text('Claim Device');
        // $("#user_register_form")[0].reset();
        if (response.error == false) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Saved successfully'
            })
            $("#add_device_form")[0].reset();
            setTimeout(function () {
                window.location.href = 'devices.php';
            }, 1500);

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }

    }).fail(function (jqXHR, exception) {
        var msg = '';
        $("#add_device_btn").text('Register');
        if (jqXHR.status === 0) {
            msg = 'Network or API error.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Bad request [404]';
        } else if (jqXHR.status == 401) {
            msg = 'Bad request [Error code: 401]\n' + jqXHR.responseJSON.detail;
            setTimeout(function () {
                window.location.href = 'login.php';
            }, 1500);
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = '[Error code: ' + jqXHR.status + '] \n' + jqXHR.responseJSON.detail;
        }

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
        })
    });


    e.preventDefault();
    e.stopImmediatePropagation();
});

