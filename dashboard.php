<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.108.0">
    <title>Smart Farm</title>

    <link href="css/bootstrap.min.css" rel="stylesheet"/>

    <!-- Favicons -->
    <link rel="apple-touch-icon" href="/docs/5.3/assets/img/favicons/apple-touch-icon.png" sizes="180x180">
    <link rel="icon" href="/docs/5.3/assets/img/favicons/favicon-32x32.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/docs/5.3/assets/img/favicons/favicon-16x16.png" sizes="16x16" type="image/png">
    <link rel="manifest" href="/docs/5.3/assets/img/favicons/manifest.json">
    <link rel="mask-icon" href="/docs/5.3/assets/img/favicons/safari-pinned-tab.svg" color="#712cf9">
    <link rel="icon" href="/docs/5.3/assets/img/favicons/favicon.ico">
    <meta name="theme-color" content="#712cf9">


    <style>
        .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
        }

        @media (min-width: 768px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }
        }

        .b-example-divider {
            height: 3rem;
            background-color: rgba(0, 0, 0, .1);
            border: solid rgba(0, 0, 0, .15);
            border-width: 1px 0;
            box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
        }

        .b-example-vr {
            flex-shrink: 0;
            width: 1.5rem;
            height: 100vh;
        }

        .bi {
            vertical-align: -.125em;
            fill: currentColor;
        }

        .nav-scroller {
            position: relative;
            z-index: 2;
            height: 2.75rem;
            overflow-y: hidden;
        }

        .nav-scroller .nav {
            display: flex;
            flex-wrap: nowrap;
            padding-bottom: 1rem;
            margin-top: -1px;
            overflow-x: auto;
            text-align: center;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
        }
    </style>


    <!-- Custom styles for this template -->
    <link href="css/dashboard.css" rel="stylesheet">
</head>
<body>

<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/dashboard.php">Smart Farm</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
            aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <input class="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search"
           aria-label="Search">
    <div class="navbar-nav">
        <div class="nav-item text-nowrap">
            <a class="nav-link px-3" href="#">Sign out</a>
        </div>
    </div>
</header>

<div class="container-fluid">
    <div class="row">
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="position-sticky pt-3 sidebar-sticky">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="dashboard.php">
                            <span data-feather="home" class="align-text-bottom"></span>
                            Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="farms.php">
                            <span data-feather="columns" class="align-text-bottom"></span>
                            Farms
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="devices.php">
                            <span data-feather="wifi" class="align-text-bottom"></span>
                            Devices
                        </a>
                    </li>
                    <!--                    <li class="nav-item">-->
                    <!--                        <a class="nav-link" href="#">-->
                    <!--                            <span data-feather="users" class="align-text-bottom"></span>-->
                    <!--                            Customers-->
                    <!--                        </a>-->
                    <!--                    </li>-->
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <span data-feather="bell" class="align-text-bottom"></span>
                            Reports
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <span data-feather="layers" class="align-text-bottom"></span>
                            Notifications
                        </a>
                    </li>
                </ul>

                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                    <span>System</span>
                    <a class="link-secondary" href="javascript:void()" aria-label="Settings">
                        <span data-feather="settings" class="align-text-bottom"></span>
                    </a>
                </h6>
                <ul class="nav flex-column mb-2">
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <span data-feather="file-text" class="align-text-bottom"></span>
                            Profile
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <span data-feather="file-text" class="align-text-bottom"></span>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                <h1 class="h2">Dashboard</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group me-2">
                        <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
                    </div>
                    <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
                        <span data-feather="calendar" class="align-text-bottom"></span>
                        This week
                    </button>
                </div>
            </div>

            <!--            <canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas>-->

            <h3>Devices</h3>
            <div class="pt-3 pb-2 mb-3 border-top">
                <div class="row mt-4 ">
                    <div class="col-md-3">
                        <div class="card" style="width: 100%;">
                            <div class="card-body">
                                <h5 class="card-title"><strong>Pump 1</strong></h5>
                                <h6 class="card-subtitle mb-2 text-muted">Farm 1</h6>
                                <p class="card-text">Temp: 25C <strong>|</strong> Humidity: 20% <strong>|</strong> Soil
                                    Moisture: 44%</p>

                                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" class="btn-check" name="btnradio" id="btnradio1"
                                           autocomplete="off">
                                    <label class="btn btn-outline-secondary" for="btnradio1">ON</label>

                                    <input type="radio" class="btn-check" name="btnradio" id="btnradio2"
                                           autocomplete="off" checked>
                                    <label class="btn btn-outline-danger" for="btnradio2">OFF</label>

                                </div>
                                <br/><i><small class="text-secondary"><strong>NB:</strong> remember to turn off pump
                                        after using</small></i>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="card" style="width: 100%;">
                            <div class="card-body">
                                <h5 class="card-title"><strong>Pump 2</strong></h5>
                                <h6 class="card-subtitle mb-2 text-muted">Farm 3</h6>
                                <p class="card-text">Temp: 25C <strong>|</strong> Humidity: 20% <strong>|</strong> Soil
                                    Moisture: 44%</p>

                                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" class="btn-check" name="btnradio" id="btnradio1"
                                           autocomplete="off">
                                    <label class="btn btn-outline-secondary" for="btnradio1">ON</label>

                                    <input type="radio" class="btn-check" name="btnradio" id="btnradio2"
                                           autocomplete="off" checked>
                                    <label class="btn btn-outline-danger" for="btnradio2">OFF</label>

                                </div>
                                <br/><i><small class="text-secondary"><strong>NB:</strong> remember to turn off pump
                                        after using</small></i>
                            </div>
                        </div>
                    </div>


                    <div class="col-md-3">
                        <div class="card" style="width: 100%;">
                            <div class="card-body">
                                <h5 class="card-title"><strong>Pump 133</strong></h5>
                                <h6 class="card-subtitle mb-2 text-muted">Farm 1</h6>
                                <p class="card-text">Temp: 25C <strong>|</strong> Humidity: 20% <strong>|</strong> Soil
                                    Moisture: 14%</p>

                                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" class="btn-check" name="btnradio" id="btnradio1"
                                           autocomplete="off">
                                    <label class="btn btn-outline-secondary" for="btnradio1">ON</label>

                                    <input type="radio" class="btn-check" name="btnradio" id="btnradio2"
                                           autocomplete="off" checked>
                                    <label class="btn btn-outline-danger" for="btnradio2">OFF</label>

                                </div>
                                <br/><i><small class="text-secondary"><strong>NB:</strong> remember to turn off pump
                                        after using</small></i>
                            </div>
                        </div>
                    </div>


                    <div class="col-md-3">
                        <div class="card" style="width: 100%;">
                            <div class="card-body">
                                <h5 class="card-title"><strong>Pump 123</strong></h5>
                                <h6 class="card-subtitle mb-2 text-muted">Farm 1342</h6>
                                <p class="card-text">Temp: 25C <strong>|</strong> Humidity: 20% <strong>|</strong> Soil
                                    Moisture: 34%</p>

                                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" class="btn-check" name="btnradio" id="btnradio1"
                                           autocomplete="off">
                                    <label class="btn btn-outline-secondary" for="btnradio1">ON</label>

                                    <input type="radio" class="btn-check" name="btnradio" id="btnradio2"
                                           autocomplete="off" checked>
                                    <label class="btn btn-outline-danger" for="btnradio2">OFF</label>

                                </div>
                                <br/><i><small class="text-secondary"><strong>NB:</strong> remember to turn off pump
                                        after using</small></i>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </main>
    </div>
</div>


<script src="js/bootstrap.bundle.min.js" type="application/javascript"></script>

<script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js"
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"
        crossorigin="anonymous"></script>
<script src="js/dashboard.js"></script>
</body>
</html>
