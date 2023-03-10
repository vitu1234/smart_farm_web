<?php
    include("includes.php");
    $api = $_ENV['API'];
//    header("Access-Control-Allow-Origin: *");
?>
<!doctype html>
<html lang="en" class="h-100">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.108.0">
    <title>Smart Farm</title>

    <!--    <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/cover/">-->


    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@latest/dist/leaflet.css"/>
    <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder@latest/dist/Control.Geocoder.css"/>
    <style>
        #map {
            width: 100%;
            height: 200px;
        }
    </style>
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
    <link href="css/cover.css" rel="stylesheet">
</head>
<body class="d-flex h-100 text-center  text-bg-secondary">

<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <header class="mb-auto">
        <div>
            <h3 class="float-md-start mb-0">Smart Farm</h3>
            <nav class="nav nav-masthead justify-content-center float-md-end">
                <a class="nav-link fw-bold py-1 px-0 " aria-current="page" href="index.php">Home</a>
                <a class="nav-link fw-bold py-1 px-0" href="#">Contact</a>
                <a class="nav-link fw-bold py-1 px-0 " href="login.php">Login</a>
                <a class="nav-link fw-bold py-1 px-0 active" href="#">Register</a>
            </nav>
        </div>
    </header>

    <main class="px-md-5 form-signin w-100 ">
        <form id="user_register_form" method="post" class="" autocomplete="off">
            <!--      <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">-->
            <h5 class="h5 mb-3 fw-normal"><strong>Register account</strong></h5>

            <div class="form1 px-md-5">
                <div class="form-floating mb-3">
                    <input autocomplete="off" type="text" class="form-control" id="username" name="username"
                           placeholder="Ex: JayJay" required/>
                    <label class="text-dark" for="username">Username</label>
                </div>

                <div class="form-floating mb-3">
                    <input autocomplete="off" type="text" class="form-control" id="first_name" name="first_name"
                           placeholder="Ex: John" required/>
                    <label class="text-dark" for="first_name">First Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input autocomplete="off" type="text" class="form-control" id="last_name" name="last_name"
                           placeholder="Ex: Doe" required/>
                    <label class="text-dark" for="last_name">Last Name</label>
                </div>


                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="email" name="email" placeholder="name@example.com" required/>
                    <label class="text-dark" for="email">Email address</label>
                </div>

                <div class="form-floating mt-3 mb-1">
                    <input type="password" class="form-control form-control-sm" id="password" name="password" required
                           placeholder="Password">
                    <label class=" text-dark" for="password">Password</label>
                </div>

                <button onclick="hideForm1()" class="w-100 btn btn-md btn-dark text-light mt-3" type="button">Next
                </button>
            </div>

            <input type="hidden" name="longtude" id="longtude" value="" required>
            <input type="hidden" name="latitude" id="latitude" value="" required>
            <input type="hidden" name="address" id="address" value="" required>


            <div class="form2 px-md-5">
                <div class="col-md-3 mb-3">
                    <button onclick="gotoForm1()" class="w-100 btn btn-md btn-dark text-light mt-3" type="button">Go
                        Back
                    </button>
                </div>
                <div class="form-floating mb-3">
                    <input autocomplete="off" type="text" class="form-control" id="farm_name" name="farm_name"
                           placeholder="Ex: John Farm1" required>
                    <label class="text-dark" for="farm_name">Farm Name</label>
                </div>
                <small>Click On the map where your farm is located</small>
                <div class="form-floating mb-3">
                    <div id="map"></div>
                </div>

                <button id="btn_register" class="w-100 btn btn-md btn-dark text-light mt-3" type="submit">Finish Registration</button>
            </div>


        </form>
    </main>

    <footer class="mt-auto text-white-50">
        <p>
            <script>document.write(new Date().getFullYear());</script> &copy; <span class="color-primary">DCN LAB</span>.
            Designed by <a href="https://github.com/vitu1234" target="_blank"><span
                class="text-light">Vitu Mafeni</span></a>
        </p>
    </footer>
</div>


</body>
<script type="text/javascript" src="js/bootstrap.bundle.min.js"></script>
<script type="text/javascript" src="js/jquery-3.6.3.min.js"></script>
<!-- Make sure you put this AFTER Leaflet's CSS -->
<!--<script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"-->
<!--        integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="-->
<!--        crossorigin=""></script>-->
<script src="https://unpkg.com/leaflet@latest/dist/leaflet-src.js"></script>
<script src="https://unpkg.com/leaflet-control-geocoder@latest/dist/Control.Geocoder.js"></script>
<script src="js/sweetalert2.js"></script>
<script>
    var api ="<?php echo $api; ?>"
</script>

<script src="js/js.js"></script>

<script type="text/javascript">
    <!--    setup map-->
    (function () {
        var map = L.map('map').setView([37.495103226722875, 126.96072667120161], 13),
            geocoders = {
                'Nominatim': L.Control.Geocoder.nominatim(),
            },
            selector = L.DomUtil.get('geocode-selector'),
            control = new L.Control.Geocoder({geocoder: null}),
            btn,
            selection,
            marker;

        function select(geocoder, el) {
            if (selection) {
                L.DomUtil.removeClass(selection, 'selected');
            }

            control.options.geocoder = geocoder;
            L.DomUtil.addClass(el, 'selected');
            selection = el;
        }

        for (var name in geocoders) {
            btn = L.DomUtil.create('button', '', selector);
            btn.innerHTML = name;
            (function (n) {
                L.DomEvent.addListener(btn, 'click', function () {
                    select(geocoders[n], this);
                }, btn);
            })(name);

            if (!selection) {
                select(geocoders[name], btn);
            }
        }

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        control.addTo(map);

        map.on('click', function (e) {
            control.options.geocoder.reverse(e.latlng, map.options.crs.scale(map.getZoom()), function (results) {
                var r = results[0];
                if (r) {
                    var lat = results[0].center.lat;
                    var lng = results[0].center.lng;
                    $("#latitude").val(lat)
                    $("#longtude").val(lng)
                    $("#address").val(r.name)
                    if (marker) {
                        map.removeLayer(marker);
                    }
                    marker = L.marker(r.center).bindPopup(r.name || r.php).addTo(map).openPopup();
                }
            })
        });
    })();

    $(document).ready(() => {
        // alert("ffj")
        $(".form2").hide()


    })

    function hideForm1() {
        if ($("#username").val().length == 0){
            setTimeout(function() { $('#username').focus(); }, 50)
            return
        }
        if ($("#first_name").val().length == 0){
            setTimeout(function() { $('#first_name').focus(); }, 50)
            return
        }
        if ($("#last_name").val().length == 0){
            setTimeout(function() { $('#last_name').focus(); }, 50)
            return
        }

        if ($("#email").val().length == 0){
            setTimeout(function() { $('#email').focus(); }, 50)
            return
        }

        if ($("#password").val().length == 0){
            setTimeout(function() { $('#password').focus(); }, 50)
            return
        }

        $(".form1").hide("500")
        $(".form2").show("500")
    }

    function gotoForm1() {
        $(".form2").hide("500")
        $(".form1").show("500")
    }
</script>
</html>
