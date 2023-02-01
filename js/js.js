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

//user devices
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
                console.log(response)
                user_devices = response.user_devices
                if (user_devices.length > 0) {
                    var cards = ''
                    $.each(user_devices, function (key, value) {
                            console.log('caste: ' + value.device_name + ' | id: ' + value.id);
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
                                '                                <h5 class="card-title"><strong>' + value.device_name + '</strong></h5>\n' +
                                '                                <h6 class="card-subtitle mb-2 text-muted">' + value.farm_name + '</h6>\n' +
                                '                                <p class="card-text">Temp: ' + value.temperature + '°C <strong>|</strong> Humidity: ' + value.humidity + '% <strong>|</strong> Soil\n' +
                                '                                    Moisture: ' + value.soil_moisture + '%</p>\n' +
                                '\n' + '<p class="mt-1"><small><em>Last record: ' + value.timestamp + '</em></small></p>' +
                                '                                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">\n' +
                                '                                    <input onclick="device_action()" type="radio" class="btn-check" name="btnradio" id="btnradio1' + value.device_id + '"\n' +
                                '                                           autocomplete="off" ' + switch_on + '>\n' +
                                '                                    <label class="btn btn-outline-secondary" for="btnradio1">ON</label>\n' +
                                '\n' +
                                '                                    <input onclick="device_action()" type="radio" class="btn-check" name="btnradio" id="btnradio2' + value.device_id + '"\n' +
                                '                                           autocomplete="off" ' + switch_off + '>\n' +
                                '                                    <label class="btn btn-outline-danger" for="btnradio2">OFF</label>\n' +
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

function device_action() {

}

$(document).ready(() => {
    // Swal.showLoading()
})