// register an account
$("#user_register_form").on('submit', function (e) {
    var form_data = $(this).serialize();
    console.log(form_data)
    $("#register_btn").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Saving...');
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
        // $("#user_register_form")[0].reset();

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
                $("#btn_add").text('Register');
                // $("#user_register_form")[0].reset();
                if (response.error == false) {
                    Swal.fire(
                        'Registered!',
                        'You have successfully registered!',
                        'success'
                    )

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
                $("#btn_add").text('Register');
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
        $("#btn_add").text('Register');
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

$(document).ready(() => {
    // alert("ffj")
    console.log(api)


})