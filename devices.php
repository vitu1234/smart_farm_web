<?php
include("includes.php");
//session_start();
//
//$api = $_ENV['API'];
//if (!isset($_SESSION['access'])) {
//    header('Location:login.php');
//}
//$access_token = $_SESSION['access'];

?>
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
    <link rel="stylesheet" type="text/css" href="css/datatables.min.css" />


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
    <div class="navbar-nav">
        <div class="nav-item text-nowrap">
            <a class="nav-link px-3" href="#">Logout</a>
        </div>
    </div>
</header>

<div class="container-fluid">
    <div class="row">
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="position-sticky pt-3 sidebar-sticky">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link " aria-current="page" href="dashboard.php">
                            <span data-feather="home" class="align-text-bottom"></span>
                            Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " href="farms.php">
                            <span data-feather="columns" class="align-text-bottom"></span>
                            Farms
                        </a>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link active" href="devices.php">
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
                    <a class="link-secondary" href="javascript:void('')" aria-label="Settings">
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
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Devices</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <a href="unclaimed_devices.php" type="button" class="btn btn-sm btn-outline-secondary">
                        <span data-feather="plus" class="align-text-bottom"></span>
                        Unclaimed Devices
                    </a>
                </div>
            </div>

            <div class="table-responsive" id="devices">
                <table class="table table-striped table-hover table-md">
                    <thead>
                    <tr>
                        <th scope="col">Device ID</th>
                        <th scope="col">Device Name</th>
                        <th scope="col">Farm Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Description</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody id="table_body">
<!--                    <tr>-->
<!--                        <td>1ddd43nbm4v3mv5bvmqvmwv5bnqasfngh</td>-->
<!--                        <td>Ndata Farm</td>-->
<!--                        <td>Temperature Sensor</td>-->
<!--                        <td>Yangjae 1(il)-dong, Seocho-gu, Seoul, South Korea</td>-->
<!--                        <td>North East of the farm</td>-->
<!--                        <td>-->
<!--                            <div class="dropdown">-->
<!--                                <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle"-->
<!--                                        data-bs-toggle="dropdown" aria-expanded="false">-->
<!--                                    <span data-feather="more-horizontal" class="align-text-bottom"></span>-->
<!--                                    Action-->
<!--                                </button>-->
<!--                                <ul class="dropdown-menu">-->
<!--                                    <li><a class="dropdown-item text-warning" href="#">-->
<!--                                        <span data-feather="edit-2" class="align-text-bottom"></span> Modify-->
<!--                                    </a></li>-->
<!--                                    <li><a class="dropdown-item text-danger" href="#">-->
<!--                                        <span data-feather="trash-2" class="align-text-bottom"></span> Delete-->
<!--                                    </a></li>-->
<!--                                </ul>-->
<!--                            </div>-->
<!--                        </td>-->
<!--                    </tr>-->


                    </tbody>
                </table>
            </div>
        </main>
    </div>
</div>

<!-- Modal Add Farm-->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
     aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="form2 px-1">
                    <div class="form-floating mb-3">
                        <input autocomplete="off" type="text" class="form-control" id="floatingInput2"
                               placeholder="Ex: John Farm1">
                        <label class="text-dark" for="floatingInput2">Device Name</label>
                    </div>
                    <small>Click On the map where your farm is located</small>
                    <div class="form-floating mb-3">
                        <div id="map"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-outline-dark">Save Farm</button>
            </div>
            </form>
        </div>
    </div>
</div>


<script src="js/bootstrap.bundle.min.js" type="application/javascript"></script>
<script type="text/javascript" src="js/jquery-3.6.3.min.js"></script>
<script src="js/datatables.min.js" type="text/javascript" ></script>

<script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js"
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"
        crossorigin="anonymous"></script>
<script src="js/dashboard.js"></script>
<script src="https://unpkg.com/leaflet@latest/dist/leaflet-src.js"></script>
<script src="https://unpkg.com/leaflet-control-geocoder@latest/dist/Control.Geocoder.js"></script>

<script src="js/map.js"></script>
<script src="js/sweetalert2.js"></script>
<script>
    var api = "<?php echo $api; ?>"
    var token ="<?php echo $access_token; ?>"
</script>
<script src="js/js.js"></script>
<script>
    $(document).ready(() => {
        get_all_user_devices("<?php echo $access_token; ?>")
    })
</script>
</body>
</html>