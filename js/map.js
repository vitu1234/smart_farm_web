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
                var lng = results[0].center.lng
                if (marker) {
                    map.removeLayer(marker);
                }
                marker = L.marker(r.center).bindPopup(r.name || r.php).addTo(map).openPopup();
            }
        })
    });
})();