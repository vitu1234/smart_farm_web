<!DOCTYPE html>
<html lang="en" class="h-100" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">

<head>
    <title>A Dashboard for Everybody</title>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="description" content="Small, speculative demo project that shows how real-time dashboards, like those used for IoT systems, can be enhanced using accessible design and development practices.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">

</head>

<body class="bg-secondary-subtle">
    <main class="container mt-5 ">
        <div class="row mb-4">
            <div class="col-md-6">

                <h1><i class="fas fa-microchip"></i> <u>A Dashboard for IoT</u> <i class="fas fa-microchip"></i>
                </h1>
            </div>
            <div class="col-md-6">

                <a class="float-end btn btn-outline-danger mx-2">Logout <i class="fas fa-sign-out-alt"></i></a>
                <a class="float-end btn btn-outline-secondary">Settings <i class="fas fa-tools"></i></a>
                <a class="float-end btn btn-outline-primary mx-2">Actuators <i class="fas fa-plug"></i></a>
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-md-3 rounded">
                <div class="card shadow-lg" style="height: 100px">
                    <div class="card-body">
                        <label for="selected-sensor" class="label">Select sensor to watch:</label>
                        <div class="form-group ">
                            <select class="form-select" onchange="populateDataOnSelectedSensor()" id="sensors_dropdown">

                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3 rounded">
                <div class="card" style="height: 100px">

                    <div class="card-body shadow-lg">

                        <div class="row " style="height: 100%">
                            <!-- <div class="col ">
                            <button style="height: 100%" class="btn btn-outline-secondary">Pause <span
                                    class="fa fa-pause" aria-hidden="true"></span></button>
                        </div> -->
                            <div class="col">
                                <label for="selected-update" class="label">Update every:</label>
                                <div class="form-group ">
                                    <select class="form-select" id="selected_update">
                                        <option value="5000">5s</option>
                                        <option value="10000">10s</option>
                                        <option value="15000">15s</option>
                                        <option value="20000">20s</option>
                                        <option value="30000">30s</option>
                                        <option value="60000">1M</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="col-md-3  rounded">
                <div class="card" style="height: 100px" id="countConnectedSensors">
                    <!-- 
                <div class="card-body shadow-lg  bg-success" >
                    <h4 class="text-light fw-bold" style="margin-top: 8%; text-align: center; font-size: 17px"><small><b>1000</b></small> Sensor(s) Connected <span class="fa fa-bolt" aria-hidden="true"></span> </h4>
                </div> -->
                </div>
            </div>

            <div class="col-md-3 ">
                <div class="card " style="height: 100px" id="countConnectedActuators">

                    <!-- <div class="card-body shadow-lg bg-danger" >
                    <h4 class="text-light fw-bold" style="margin-top: 8%; text-align: center; font-size: 17px"><small><b>1000</b></small> Actuator(s)
                         Connected <span class="fa fa-plug" aria-hidden="true"></span></h4>
                </div> -->
                </div>
            </div>


        </div>


        <div class="row">
            <div class="col-md-8  ">
                <div class="card mt-4 bg-white shadow rounded">
                    <h4 class="text-center">Live Sensor Data</h4>
                    <div class="card-body">
                        <canvas width="100" height="41" id="sensorChart1"></canvas>
                    </div>
                </div>
            </div>

            <div class="col-md-4 ">
                <div class="card mt-4 mb-2 bg-white shadow rounded">
                    <h4 class="text-center mt-1">Sensor Highlights</h4>
                    <div class="card-body">
                        <div class="row ">
                            <div class="col-md-6 my-1">
                                <div class="bg-body-secondary d-flex justify-content-center align-items-center" style="width: 100%; height: 150px; border-radius: 5px">
                                    <div class="text-center">
                                        <p class="text-center mt-1">Most Recent</p>
                                        <h4 id="most_recent_highlight" class="text-center"><strong>--</strong></h4>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 my-1">
                                <div class="bg-body-secondary d-flex justify-content-center align-items-center" style="width: 100%; height: 150px; border-radius: 5px">
                                    <div class="text-center">
                                        <p class="text-center mt-1">Records Total</p>
                                        <h4 class="text-center" id="total_records_highlight"><strong>--</strong></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3 " style="height: 100%">
                            <div class="col-md-6 my-1">
                                <div class="bg-body-secondary d-flex justify-content-center align-items-center" style="width: 100%; height: 150px; border-radius: 5px">
                                    <div class="text-center">
                                        <p class="text-center mt-1">Triggers Set</p>
                                        <h4 class="text-center"><strong>--</strong></h4>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 my-1">
                                <div class="bg-body-secondary d-flex justify-content-center align-items-center" style="width: 100%; height: 150px; border-radius: 5px">
                                    <div class="text-center">
                                        <p class="text-center mt-1">Average Reading</p>
                                        <h4 class="text-center" id="average_reading_highlight"><strong>--</strong></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="row mt-3" id="bottom_container">
            <div class="col-md-2 bg-light"></div>
            <div class="col-md-4 bg-light">

                <div class="container-fluid shadow p-3" style="width: 100%; border-radius: 5px">
                    <h4 class="text-dark-emphasis">Create a trigger</h4>

                    <form method="post" id="saveTriggerForm">
                        <input type="hidden" name="property_identifier_sensor" id="property_identifier_sensor" />
                        <div class="bg-body-secondary p-2">
                            <span class=" mt-1"><b>When data goes ...</b></span>
                            <div class="custom-control custom-radio">
                                <input required type="radio" id="customRadio1" value="Above" name="property_trigger_type" class="custom-control-input">
                                <label class="custom-control-label" for="customRadio1">Above</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input required type="radio" id="customRadio2" value="Below" name="property_trigger_type" class="custom-control-input">
                                <label class="custom-control-label" for="customRadio2">Below</label>
                            </div>
                            <span class=" mt-1"><b>This value:</b></span>
                            <div class="col-md-6 mb-3">
                                <input type="number" class="form-control" id="property_value_trigger" name="property_value_trigger" min="0" value="" required>
                            </div>
                        </div>

                        <div class="bg-body-secondary p-2 mt-2">
                            <span class=" mt-1"><b>Make this actuator ...</b></span>
                            <div class="form-group ">
                                <select class="form-select" id="actuators_dropdown" name="actuators_dropdown" required>

                                </select>
                            </div>

                            <div class="custom-control custom-radio">
                                <input required type="radio" id="customRadio11" value="ON" name="property_trigger_action" class="custom-control-input">
                                <label class="custom-control-label" for="customRadio11">On</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input required type="radio" id="customRadio22" value="OFF" name="property_trigger_action" class="custom-control-input">
                                <label class="custom-control-label" for="customRadio22">Off</label>
                            </div>

                            </br>
                            <span class=" mt-1"><b>For these minutes ...</b> </span><br /><small class="text-danger">(Leave
                                blank to keep action
                                infinite)</small>
                            <div class="col-md-6 mb-3">
                                <input type="number" value="" class="form-control" id="property_trigger_period" name="property_trigger_period" min="0" />
                            </div>
                        </div>
                        <button id="submitBtnTrigger" type="submit" style="width: 100%" class="btn btn-outline-primary mt-1">Save</button>
                    </form>

                </div>
            </div>


            <div class="col-md-4 bg-light-subtle">

                <div class="container-fluid shadow p-3 d-flex flex-column" style="width: 100%; height: 540px; border-radius: 5px; border: 5px dashed #cbcbcb">
                <h4 class="text-warning-emphasis text-center">Status</h4>
                    <div class="flex-grow-1"></div> <!-- This div will push the button to the bottom -->
                    <button id="submitBtnDeleteSensor" style="width: 100%" class="btn btn-outline-danger mt-1">Deactivate Device</button>
                </div>
            </div>
            <div class="col-md-2 bg-light"></div>
            <!-- 
        <div class="col-md-3 bg-light-subtle">

            <div class="container-fluid shadow p-3"
                 style="width: 100%; height: 540px; border-radius: 5px; border: 5px dashed #cbcbcb">
            </div>
        </div>
        <div class="col-md-3 bg-light-subtle">

            <div class="container-fluid shadow p-3"
                 style="width: 100%; height: 540px; border-radius: 5px; border: 5px dashed #cbcbcb">
            </div>
        </div> -->
        </div>

        <!-- Bootstrap JS and custom script -->
        <script type="text/javascript" src="js/bootstrap.bundle.min.js"></script>
        <script type="text/javascript" src="js/jquery-3.6.3.min.js"></script>
        <!-- Chart.js -->

        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script>
            // Simulated sensor data
            const sensorData1 = [10, 15, 25, 30, 20, 35];

            // Create charts
            // const ctx1 = document.getElementById('sensorChart1').getContext('2d');
            // const sensorChart1 = new Chart(ctx1, {
            //     type: 'line',
            //     data: {
            //         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            //         datasets: [{
            //             label: 'Sensor Data for Device 1',
            //             data: sensorData1,
            //             borderColor: 'rgba(75, 192, 192, 1)',
            //             backgroundColor: 'rgba(75, 192, 192, 0.2)',
            //             borderWidth: 1,
            //             fill: true
            //         }]
            //     },
            //     options: {
            //         scales: {
            //             y: {
            //                 beginAtZero: true
            //             }
            //         },
            //     }
            // });



            // // Simulated device interactions
            // document.getElementById("device1-on").addEventListener("click", function () {
            //     // Simulate turning on Device 1
            //     alert("Turning on Device 1");
            // });

            // document.getElementById("device1-off").addEventListener("click", function () {
            //     // Simulate turning off Device 1
            //     alert("Turning off Device 1");
            // });

            // document.getElementById("device2-on").addEventListener("click", function () {
            //     // Simulate turning on Device 2
            //     alert("Turning on Device 2");
            // });

            // document.getElementById("device2-off").addEventListener("click", function () {
            //     // Simulate turning off Device 2
            //     alert("Turning off Device 2");
            // });
        </script>
        <script src="js/sweetalert2.js"></script>
        <script src="js/charts.js"></script>
        <script>
            $(document).ready(() => {
                $("#bottom_container").hide()
                populateDashboardSensors()
                
                var periodDelay = $("#selected_update").val()
                setInterval(periodicUpdate, periodDelay);
            })
        </script>
        <script src="js/js.js"></script>
    </main>
</body>

</html>