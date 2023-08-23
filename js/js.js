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


//setup 
const sensorChart1 = document.getElementById('sensorChart1').getContext('2d');
const chart = new Chart(sensorChart1, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
            fill: true
        }]
    },
    options: {
        animations: {
            tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
    }
});

chart.options.animation = true;



function populateDashboardSensors() {
    Swal.showLoading()
    $.ajax({
        headers: {
            "accept": "application/json",
            // "Authorization": "JWT " + token
        },
        url: "backend/api/index.php?dashboard_setup=true",
        method: 'GET',
        success: function (response) {
            console.log(response)
            Swal.close()
            if (response.isError === false) {
                data = response.data
                //set sensor data
                var sensors_dropdown = '<option disabled selected>---</option>'
                if (data.connected_sensors.length > 0) {
                    $.each(data.connected_sensors, function (key, value) {
                        sensors_dropdown += '<option value="' + value.property_identifier + '<>' + value.wireless_device_identifier + '<>' + value.property_name + ' - ' + value.wireless_device_name + ' - ' + value.wireless_device_connection.toUpperCase() + '">' + value.property_name + ' - ' + value.wireless_device_name + ' - ' + value.wireless_device_connection.toUpperCase() + '</option>'
                    });

                    $("#countConnectedSensors").html('<div class="card-body shadow-lg  bg-success" ><h4 class="text-light fw-bold" style="margin-top: 8%; text-align: center; font-size: 17px"><small><b>' + data.connected_sensors.length + '</b></small> Sensor(s) Connected <span class="fa fa-bolt" aria-hidden="true"></span> </h4></div>')
                    $("#sensors_dropdown").html(sensors_dropdown)
                } else {
                    $("#countConnectedSensors").html('<div class="card-body shadow-lg  bg-danger" ><h4 class="text-light fw-bold" style="margin-top: 8%; text-align: center; font-size: 17px"><small><b>' + data.connected_sensors.length + '</b></small> Sensor(s) Connected <span class="fa fa-bolt" aria-hidden="true"></span> </h4></div>')
                    $("#sensors_dropdown").html(sensors_dropdown)
                }

                //set actuator data
                var actuators_dropdown = '<option disabled selected>---</option>'
                if (data.connected_actuators.length > 0) {
                    $.each(data.connected_actuators, function (key, value) {
                        actuators_dropdown += '<option value="' + value.property_identifier + '<>' + value.wireless_device_identifier + '">' + value.property_name + ' - ' + value.wireless_device_name + ' - ' + value.wireless_device_connection.toUpperCase() + '</option>'
                    });

                    $("#countConnectedActuators").html('<div class="card-body shadow-lg  bg-success" ><h4 class="text-light fw-bold" style="margin-top: 8%; text-align: center; font-size: 17px"><small><b>' + data.connected_actuators.length + '</b></small> Actuator(s) Connected <span class="fa fa-plug" aria-hidden="true"></span> </h4></div>')
                    $("#actuators_dropdown").html(actuators_dropdown)
                } else {
                    $("#countConnectedActuators").html('<div class="card-body shadow-lg  bg-danger" ><h4 class="text-light fw-bold" style="margin-top: 8%; text-align: center; font-size: 17px"><small><b>' + data.connected_actuators.length + '</b></small> Actuator(s) Connected <span class="fa fa-plug" aria-hidden="true"></span> </h4></div>')
                    $("#actuators_dropdown").html(actuators_dropdown)
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

function populateDataOnSelectedSensor() {
    // alert($("#sensors_dropdown").val())
    $("#bottom_container").show()
    var selectedValue = $("#sensors_dropdown").val()
    const [property_identifier, wireless_device_identifier, watch_sensor_name] = selectedValue.split("<>");
    $("#property_identifier_sensor").val(property_identifier)
    Swal.showLoading()
    $.ajax({
        headers: {
            "accept": "application/json",
            // "Authorization": "JWT " + token
        },
        url: "backend/api/index.php?property_identifier=" + property_identifier + "&&wireless_device_identifier=" + wireless_device_identifier,
        method: 'GET',
        success: function (response) {
            Swal.close()
            if (response.isError === false) {
                data = response.data
                if (data.graph_records.length > 0) {

                    // const sensorData1 = [10, 15, 25, 30, 20, 35];
                    // Extract data for charting
                    var labels = data.graph_records.map(record => record.property_last_seen);
                    var dataChart = data.graph_records.map(record => parseFloat(record.property_reading));
                    chart.data.labels = labels;
                    chart.data.datasets[0].data = dataChart;
                    chart.data.datasets[0].label = watch_sensor_name;


                    // Update chart
                    chart.update();
                    if (data.connected_sensors.length > 0) {
                        $("#countConnectedSensors").html('<div class="card-body shadow-lg  bg-success" ><h4 class="text-light fw-bold" style="margin-top: 8%; text-align: center; font-size: 17px"><small><b>' + data.connected_sensors.length + '</b></small> Sensor(s) Connected <span class="fa fa-bolt" aria-hidden="true"></span> </h4></div>')
                    } else {
                        $("#countConnectedSensors").html('<div class="card-body shadow-lg  bg-danger" ><h4 class="text-light fw-bold" style="margin-top: 8%; text-align: center; font-size: 17px"><small><b>' + data.connected_sensors.length + '</b></small> Sensor(s) Connected <span class="fa fa-bolt" aria-hidden="true"></span> </h4></div>')
                    }

                    if (data.connected_actuators.length > 0) {
                        $("#countConnectedActuators").html('<div class="card-body shadow-lg  bg-success" ><h4 class="text-light fw-bold" style="margin-top: 8%; text-align: center; font-size: 17px"><small><b>' + data.connected_actuators.length + '</b></small> Actuator(s) Connected <span class="fa fa-plug" aria-hidden="true"></span> </h4></div>')
                    } else {
                        $("#countConnectedActuators").html('<div class="card-body shadow-lg  bg-danger" ><h4 class="text-light fw-bold" style="margin-top: 8%; text-align: center; font-size: 17px"><small><b>' + data.connected_actuators.length + '</b></small> Actuator(s) Connected <span class="fa fa-plug" aria-hidden="true"></span> </h4></div>')
                    }


                    $("#most_recent_highlight").html("<strong>" + Math.round(data.most_recent_highlight.property_reading).toFixed(0) + "" + data.most_recent_highlight.property_unit + "</strong>")
                    $("#total_records_highlight").html("<strong>" + data.total_records_highlight + "</strong>")
                    $("#average_reading_highlight").html("<strong>" + data.average_highlight.average + data.average_highlight.property_unit + "</strong>")


                    //SETUP TRIGGER UI
                    // triggers set for this sensor or not
                    if (data.associated_trigger.length > 0) {
                        // $("#")
                    } else {
                        $("#triggerContainer").html(
                            '<form method="post" id="saveTriggerForm">' +
                            '<input type="text" name="property_identifier_sensor" id="property_identifier_sensor" />' +
                            '<input type="text" name="property_identifier_actuator" id="property_identifier_actuator" />' +
                            '<div class="bg-body-secondary p-2">' +
                            '<span class=" mt-1"><b>When data goes ...</b></span>' +
                            '<div class="custom-control custom-radio">' +
                            '<input required type="radio" id="customRadio1" value="Above" name="property_trigger_type" class="custom-control-input">' +
                            '<label class="custom-control-label" for="customRadio1">Above</label>' +
                            '</div>' +
                            '<div class="custom-control custom-radio">' +
                            '<input required type="radio" id="customRadio2" value="Below" name="property_trigger_type" class="custom-control-input">' +
                            '<label class="custom-control-label" for="customRadio2">Below</label>' +
                            '</div>' +
                            '<span class=" mt-1"><b>This value:</b></span>' +
                            '<div class="col-md-6 mb-3">' +
                            '<input type="number" class="form-control" id="property_value_trigger" name="property_value_trigger" min="0" value="" required>' +
                            '</div>' +
                            '</div>' +

                            '<div class="bg-body-secondary p-2 mt-2">' +
                            '<span class=" mt-1"><b>Make this actuator ...</b></span>' +
                            '<div class="form-group">' +
                            '<select class="form-select" id="actuators_dropdown" name="actuators_dropdown" required>' +
                            '</select>' +
                            '</div>' +

                            '<div class="custom-control custom-radio">' +
                            '<input required type="radio" id="customRadio11" value="ON" name="property_trigger_action" class="custom-control-input">' +
                            '<label class="custom-control-label" for="customRadio11">On</label>' +
                            '</div>' +
                            '<div class="custom-control custom-radio">' +
                            '<input required type="radio" id="customRadio22" value="OFF" name="property_trigger_action" class="custom-control-input">' +
                            '<label class="custom-control-label" for="customRadio22">Off</label>' +
                            '</div>' +

                            '<br />' +
                            '<span class=" mt-1"><b>For these minutes ...</b></span><br />' +
                            '<small class="text-danger">(Leave blank to keep action infinite)</small>' +
                            '<div class="col-md-6 mb-3">' +
                            '<input type="number" value="" class="form-control" id="property_trigger_period" name="property_trigger_period" min="0" />' +
                            '</div>' +
                            '</div>' +

                            '<button id="submitBtnTrigger" type="submit" style="width: 100%" class="btn btn-outline-primary mt-1">Save</button>' +
                            '</form>'
                        );

                        var actuators_dropdown = '<option disabled selected>---</option>'
                        if (data.connected_actuators.length > 0) {
                            $.each(data.connected_actuators, function (key, value) {
                                actuators_dropdown += '<option value="' + value.property_identifier + '<>' + value.wireless_device_identifier + '">' + value.property_name + ' - ' + value.wireless_device_name + ' - ' + value.wireless_device_connection.toUpperCase() + '</option>'
                            });

                            $("#countConnectedActuators").html('<div class="card-body shadow-lg  bg-success" ><h4 class="text-light fw-bold" style="margin-top: 8%; text-align: center; font-size: 17px"><small><b>' + data.connected_actuators.length + '</b></small> Actuator(s) Connected <span class="fa fa-plug" aria-hidden="true"></span> </h4></div>')
                            $("#actuators_dropdown").html(actuators_dropdown)
                        } else {
                            $("#countConnectedActuators").html('<div class="card-body shadow-lg  bg-danger" ><h4 class="text-light fw-bold" style="margin-top: 8%; text-align: center; font-size: 17px"><small><b>' + data.connected_actuators.length + '</b></small> Actuator(s) Connected <span class="fa fa-plug" aria-hidden="true"></span> </h4></div>')
                            $("#actuators_dropdown").html(actuators_dropdown)
                        }
                    }

                } else {
                    $("#countConnectedSensors").html('<div class="card-body shadow-lg  bg-danger" ><h4 class="text-light fw-bold" style="margin-top: 8%; text-align: center; font-size: 17px"><small><b>' + data.connected_sensors.length + '</b></small> Sensor(s) Connected <span class="fa fa-bolt" aria-hidden="true"></span> </h4></div>')
                    $("#sensors_dropdown").html(sensors_dropdown)
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

function periodicUpdate() {
    var selectedValue = $("#sensors_dropdown").val()
    // console.log("Refreshing data with interval set")
    if (selectedValue !== null && selectedValue !== "") {
        const [property_identifier, wireless_device_identifier, watch_sensor_name] = selectedValue.split("<>");
        $.ajax({
            headers: {
                "accept": "application/json",
                // "Authorization": "JWT " + token
            },
            url: "backend/api/index.php?property_identifier=" + property_identifier + "&&wireless_device_identifier=" + wireless_device_identifier,
            method: 'GET',
            success: function (response) {
                Swal.close()
                if (response.isError === false) {
                    data = response.data
                    if (data.graph_records.length > 0) {

                        // const sensorData1 = [10, 15, 25, 30, 20, 35];
                        // Extract data for charting
                        var labels = data.graph_records.map(record => record.property_last_seen);
                        var dataChart = data.graph_records.map(record => parseFloat(record.property_reading));
                        chart.data.labels = labels;
                        chart.data.datasets[0].data = dataChart;
                        chart.data.datasets[0].label = watch_sensor_name;
                        // Update chart
                        chart.update();

                        if (data.connected_sensors.length > 0) {
                            $("#countConnectedSensors").html('<div class="card-body shadow-lg  bg-success" ><h4 class="text-light fw-bold" style="margin-top: 8%; text-align: center; font-size: 17px"><small><b>' + data.connected_sensors.length + '</b></small> Sensor(s) Connected <span class="fa fa-bolt" aria-hidden="true"></span> </h4></div>')
                        } else {
                            $("#countConnectedSensors").html('<div class="card-body shadow-lg  bg-danger" ><h4 class="text-light fw-bold" style="margin-top: 8%; text-align: center; font-size: 17px"><small><b>' + data.connected_sensors.length + '</b></small> Sensor(s) Connected <span class="fa fa-bolt" aria-hidden="true"></span> </h4></div>')
                        }

                        if (data.connected_actuators.length > 0) {
                            $("#countConnectedActuators").html('<div class="card-body shadow-lg  bg-success" ><h4 class="text-light fw-bold" style="margin-top: 8%; text-align: center; font-size: 17px"><small><b>' + data.connected_actuators.length + '</b></small> Actuator(s) Connected <span class="fa fa-plug" aria-hidden="true"></span> </h4></div>')
                        } else {
                            $("#countConnectedActuators").html('<div class="card-body shadow-lg  bg-danger" ><h4 class="text-light fw-bold" style="margin-top: 8%; text-align: center; font-size: 17px"><small><b>' + data.connected_actuators.length + '</b></small> Actuator(s) Connected <span class="fa fa-plug" aria-hidden="true"></span> </h4></div>')
                        }

                        $("#most_recent_highlight").html("<strong>" + Math.round(data.most_recent_highlight.property_reading).toFixed(0) + "" + data.most_recent_highlight.property_unit + "</strong>")
                        $("#total_records_highlight").html("<strong>" + data.total_records_highlight + "</strong>")
                        $("#average_reading_highlight").html("<strong>" + data.average_highlight.average + data.average_highlight.property_unit + "</strong>")

                    } else {
                        $("#countConnectedSensors").html('<div class="card-body shadow-lg  bg-danger" ><h4 class="text-light fw-bold" style="margin-top: 8%; text-align: center; font-size: 17px"><small><b>' + data.connected_sensors.length + '</b></small> Sensor(s) Connected <span class="fa fa-bolt" aria-hidden="true"></span> </h4></div>')
                        $("#sensors_dropdown").html(sensors_dropdown)
                    }

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'There\'s a problem loading data from the server!',
                    })
                }


            }
        })
    } else {
        console.log("No sensor selected from dropdown!")
    }
}

// login user
$("#saveTriggerForm2").on('submit', function (e) {
    alert("sdhdh")
    var form_data = $(this).serialize();
    $("#submitBtnTrigger").html('<span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span> Saving...');
    $.ajax({ //make ajax request to cart_process.php
        headers: {
            "accept": "application/json",
        },
        url: "backend/api/index.php",
        type: "POST",
        // crossDomain: true,
        // xhrFields: { withCredentials: true },
        dataType: "json", //expect json value from server
        data: form_data
    }).done(function (response) { //on Ajax success
        // $("#btn_add").text('Register');
        // $("#user_register_form")[0].reset();

        $("#submitBtnTrigger").text('Save');
        $("#saveTriggerForm")[0].reset();
        if (response.isError === false) {
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

            // setTimeout(function () {
            //     window.location.href = 'dashboard.php';
            // }, 1000);

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






$(document).on('submit', '#saveTriggerForm', function(e) {
    e.preventDefault(); // Prevent the default form submission
    var selectedValue = $("#sensors_dropdown").val()
    const [property_identifier_sensor, wireless_device_identifier, watch_sensor_name] = selectedValue.split("<>");

    var selectedValueActuator = $("#actuators_dropdown").val()
    const [property_identifier_actuator, wireless_device_identifier1] = selectedValueActuator.split("<>");

    $("#property_identifier_sensor").val(property_identifier_sensor)
    $("#property_identifier_actuator").val(property_identifier_actuator)

    var form_data = $(this).serialize(); // Serialize the form data

    // $.ajax({
    //     url: 'your_form_processing_script.php',
    //     method: 'POST',
    //     data: formData,
    //     success: function(response) {
    //         // Handle the success response here
    //     },
    //     error: function(xhr, status, error) {
    //         // Handle errors here
    //     }
    // });


    $("#submitBtnTrigger").html('<span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span> Saving...');
    $.ajax({ //make ajax request to cart_process.php
        headers: {
            "accept": "application/json",
        },
        url: "backend/api/index.php",
        type: "POST",
        // crossDomain: true,
        // xhrFields: { withCredentials: true },
        dataType: "json", //expect json value from server
        data: form_data
    }).done(function (response) { //on Ajax success
        // $("#btn_add").text('Register');
        // $("#user_register_form")[0].reset();

        $("#submitBtnTrigger").text('Save');
        $("#saveTriggerForm")[0].reset();
        if (response.isError === false) {
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

            // setTimeout(function () {
            //     window.location.href = 'dashboard.php';
            // }, 1000);

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
});













//-------------------------------OLD CODE BELOW---------------------------
//-------------------------------OLD CODE BELOW---------------------------
//-------------------------------OLD CODE BELOW---------------------------
//-------------------------------OLD CODE BELOW---------------------------
//-------------------------------OLD CODE BELOW---------------------------

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
            console.log(response)
            Swal.close()
            if (response.error === false) {
                user_devices = response.user_devices
                if (user_devices.length > 0) {
                    var cards = ''
                    $.each(user_devices, function (key, value) {
                        switch_on = ''
                        switch_off = ''
                        if (value.switch_status === true) {
                            switch_on = 'checked'
                            switch_off = ''
                        } else {
                            switch_off = 'checked'
                            switch_on = ''
                        }
                        var readings = ''
                        $.each(value.units, function (key_unit, value_unit) {
                            var reading = "<strong>" + key_unit.replace(/^./, key_unit[0].toUpperCase()) + ":</strong> " + value[key_unit] + value_unit + "<br/>"
                            readings += reading
                        })

                        var settings = ''
                        var action = ''
                        if (value.device_type !== 'sensor') {
                            action = '                                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">\n' +


                                '                                    <input value="true" onclick="set_device_action(\'' + value.device_id + '\')" type="radio" class="btn-check" name="btnradio' + value.device_id + '" id="btnradio1' + value.device_id + '"\n' +
                                '                                           autocomplete="off" ' + switch_on + '>\n' +
                                '                                    <label class="btn btn-outline-secondary" for="btnradio1' + value.device_id + '">ON</label>\n' +
                                '\n' +


                                '                                    <input value="false" onclick="set_device_action(\'' + value.device_id + '\')" type="radio" class="btn-check" name="btnradio' + value.device_id + '" id="btnradio2' + value.device_id + '"\n' +
                                '                                           autocomplete="off" ' + switch_off + '>\n' +
                                '                                    <label class="btn btn-outline-danger" for="btnradio2' + value.device_id + '">OFF</label>\n' +
                                '\n' +

                                '                                </div>\n' +
                                '                                <br/><i><small class="text-secondary"><strong>NB:</strong> remember to turn off actuators\n' +
                                '                                        after using</small></i>\n'
                            settings = '<a href="device_settings.php?device_id=' + value.device_id + '" class="float-end"><strong>Setting</strong></a>\n'
                        }

                        card = '<div class="col-md-3">\n' +
                            '                        <div class="card" style="width: 100%;">\n' +
                            '                            <div class="card-body">\n' +
                            settings +
                            '                                <h5 class="card-title"><strong>' + value.device_name + '</strong></h5>\n' +
                            '                                <h6 class="card-subtitle mb-2 text-muted">' + value.farm_name + '</h6>\n' +
                            '                                <p class="card-text">' + readings + '</p>\n' +
                            '\n' + '<p class="mt-1"><small><em>Last activity: ' + value.timestamp + '</em></small></p>' +
                            action +
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
    var form_data = { "pump_action": checked, "pump_device_id": device_id };


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
                    text: response.msg
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
function setUnclaimedDevice(dev_id, dev_type) {
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


