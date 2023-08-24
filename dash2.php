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
    <style>
        /* Style for the logo */
        .logo-container {
            display: flex;
            align-items: center;
        }

        .logo-img {
            width: 190px;
            height: auto;
            margin-right: 10px;
        }
    </style>
</head>

<body class="bg-secondary-subtle">
    <main class="container mt-5 ">
        <div class="row mb-4">
            <div class="col-md-6">

                <h3>
                    <div class="logo-container">
                        <img src="img/logodcn.png" class="logo-img" alt="Logo">
                        <i class="fas fa-microchip"></i><u>A Dashboard for IoT</u> <i class="fas fa-microchip"></i>
                    </div>
                </h3>
            </div>
            <div class="col-md-6">

                <a href="login.php" class="float-end btn btn-outline-danger mx-2">Logout <i class="fas fa-sign-out-alt"></i></a>
                <a class="float-end btn btn-outline-secondary">Settings <i class="fas fa-tools"></i></a>
                <a href="dash.php" class="float-end btn btn-outline-primary mx-2">Sensors <i class="fas fa-bolt"></i></a>
            </div>
        </div>
        <div class="row mb-4">


            <div class="col-md-6  rounded">
                <div class="card" style="height: 100px" id="countConnectedSensors">

                    <div class="card-body shadow-lg  bg-success">
                        <h4 class="text-light fw-bold" style="margin-top: 4%; text-align: center; font-size: 17px"><small><b>1000</b></small> Sensor(s) Connected <span class="fa fa-bolt" aria-hidden="true"></span> </h4>
                    </div>
                </div>
            </div>

            <div class="col-md-6 ">
                <div class="card " style="height: 100px" id="countConnectedActuators">

                    <div class="card-body shadow-lg bg-danger">
                        <h4 class="text-light fw-bold" style="margin-top: 4%; text-align: center; font-size: 17px"><small><b>1000</b></small> Actuator(s)
                            Connected <span class="fa fa-plug" aria-hidden="true"></span></h4>
                    </div>
                </div>
            </div>


        </div>




        <div class="row mt-3">
            <div class="container">
                <div class="shadow p-1 d-flex flex-column" style="height: 80px; font-size: 12px; background-color: white;">
                    <h4 class="text-center m-3 ">All Switches or Actuators will appear here</h4>
                </div>
            </div>
            <!-- Add this code inside the <div class="col-md-4 bg-light-subtle"> section -->
            <div class="row mt-3">
                <div class="container">
                    <div class=" p-1 d-flex flex-column" style="height: 20px; ">
                    </div>
                </div>

                <div id="actuatorsList"></div>

            </div>

            <!-- Bootstrap JS and custom script -->
            <script type="text/javascript" src="js/bootstrap.bundle.min.js"></script>
            <script type="text/javascript" src="js/jquery-3.6.3.min.js"></script>
            <!-- Chart.js -->

            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

            <script src="js/sweetalert2.js"></script>
            <script src="js/charts.js"></script>
            <script>
                $(document).ready(() => {
                    setupDashboadSwitches()
                    // $("#bottom_container").hide()
                    // populateDashboardSensors()

                    // var periodDelay = $("#selected_update").val()
                    // setInterval(periodicUpdate, periodDelay);
                })
            </script>
            <script src="js/js.js"></script>
    </main>
</body>

</html>