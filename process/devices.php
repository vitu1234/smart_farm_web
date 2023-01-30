<?php
//include("../includes/includes.php");
$url = 'http://192.168.13.200:8000/switch_by_device';
if (isset($_POST['pump_device_id']) && isset($_POST['pump_action'])) {
    $pump_device_id = addslashes($_POST['pump_device_id']);
    $pump_action = addslashes($_POST['pump_action']);
    $data = array('pump_device_id' => $pump_device_id, "pump_action" => $pump_action);

//The url you wish to send the POST request to
//    $url = $file_name;

//The data you want to send via POST
    $fields = [
        'pump_device_id' => $pump_device_id, "pump_action" => $pump_action
    ];

//url-ify the data for the POST
    $fields_string = json_encode($fields);

//open connection
    $ch = curl_init();

//set the url, number of POST vars, POST data
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);

//So that curl_exec returns the contents of the cURL; rather than echoing it
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

//execute post
    $result = json_decode(curl_exec($ch));
    print_r($result);
}else{
    echo "resposos";
}
