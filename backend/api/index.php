<?php
header('Content-type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', '1');

include("../connection/Functions.php");
$operation = new Functions();

// echo "<pre>";
// print_r($_POST);
// echo "</pre>";

// die();
if (isset($_GET['dashboard_setup']) && !empty($_GET['dashboard_setup']) && $_GET['dashboard_setup'] == 'true') {

  $device_propertiesRead = $operation->retrieveMany("
      SELECT 
          wireless_device_name, wireless_device.wireless_device_identifier,
          wireless_device.wireless_device_connection,
          property_identifier,
          property_name
      FROM device_property
        INNER JOIN wireless_device
        ON device_property.wireless_device_identifier = wireless_device.wireless_device_identifier
      WHERE device_property.property_access_mode = 'read'
      GROUP BY wireless_device.wireless_device_connection,wireless_device_name, 
        wireless_device.wireless_device_identifier,property_identifier,property_name 
      ORDER BY property_name ASC;
    ");

  $device_propertiesReadWrite = $operation->retrieveMany("
    SELECT 
          wireless_device_name, wireless_device.wireless_device_identifier,
          wireless_device.wireless_device_connection,
          property_identifier,
          property_name
      FROM device_property
        INNER JOIN wireless_device
        ON device_property.wireless_device_identifier = wireless_device.wireless_device_identifier
      WHERE device_property.property_access_mode = 'readwrite'
      GROUP BY wireless_device.wireless_device_connection,wireless_device_name, 
        wireless_device.wireless_device_identifier,property_identifier,property_name 
      ORDER BY property_name ASC;
  ");

  $data = array(
    "connected_sensors" => $device_propertiesRead,
    "connected_actuators" => $device_propertiesReadWrite
  );


  echo json_encode(["isError" => false, "msg" => "Registered devices", "data" => $data]);
} elseif (isset($_GET['property_identifier']) && !empty($_GET['property_identifier']) && isset($_GET['wireless_device_identifier']) && !empty($_GET['wireless_device_identifier'])) {
  $property_identifier = addslashes($_GET['property_identifier']);
  $wireless_device_identifier = addslashes($_GET['wireless_device_identifier']);
  $device_data_rows = $operation->retrieveMany("
  SELECT 
    property_reading, property_unit,   DATE_FORMAT(property_last_seen, '%Hh:%i') as property_last_seen
  FROM device_property
  WHERE device_property.property_identifier = '" . $property_identifier . "' AND wireless_device_identifier= '" . $wireless_device_identifier . "'
  ORDER BY device_property_id DESC LIMIT 50;
  ");

  $device_data = $operation->retrieveSingle("
  SELECT 
    *
  FROM device_property
  WHERE device_property.property_identifier = '" . $property_identifier . "' AND wireless_device_identifier= '" . $wireless_device_identifier . "'
  ORDER BY device_property_id DESC;
  ");

  $device_data_total_records = $operation->countAll("
  SELECT 
    *
  FROM device_property
  WHERE device_property.property_identifier = '" . $property_identifier . "' AND wireless_device_identifier= '" . $wireless_device_identifier . "'
  ORDER BY device_property_id DESC;
  ");
  // $average = $operation->retrieveSingle("SELECT property_identifier, property_name, property_unit,property_reading, ROUND(AVG(property_reading)) AS average FROM `device_property` WHERE device_property.property_identifier = '".$property_identifier."' AND wireless_device_identifier= '".$wireless_device_identifier."'");
  $average = $operation->retrieveSingle("
  SELECT subquery.property_identifier, subquery.property_name, subquery.property_unit, subquery.property_reading, ROUND(AVG(subquery.property_reading)) AS average
  FROM (
      SELECT property_identifier, property_name, property_unit, property_reading
      FROM device_property
      WHERE device_property.property_identifier = '" . $property_identifier . "' AND wireless_device_identifier= '" . $wireless_device_identifier . "'
      LIMIT 0, 25
  ) AS subquery
  GROUP BY subquery.property_identifier, subquery.property_name, subquery.property_unit, subquery.property_reading;
");


  $device_propertiesRead = $operation->retrieveMany("
      SELECT 
          wireless_device_name, wireless_device.wireless_device_identifier,
          wireless_device.wireless_device_connection,
          property_identifier,
          property_name
      FROM device_property
        INNER JOIN wireless_device
        ON device_property.wireless_device_identifier = wireless_device.wireless_device_identifier
      WHERE device_property.property_access_mode = 'read'
      GROUP BY wireless_device.wireless_device_connection,wireless_device_name, 
        wireless_device.wireless_device_identifier,property_identifier,property_name 
      ORDER BY property_name ASC;
    ");

  $device_propertiesReadWrite = $operation->retrieveMany("
    SELECT 
          wireless_device_name, wireless_device.wireless_device_identifier,
          wireless_device.wireless_device_connection,
          property_identifier,
          property_name
      FROM device_property
        INNER JOIN wireless_device
        ON device_property.wireless_device_identifier = wireless_device.wireless_device_identifier
      WHERE device_property.property_access_mode = 'readwrite'
      GROUP BY wireless_device.wireless_device_connection,wireless_device_name, 
        wireless_device.wireless_device_identifier,property_identifier,property_name 
      ORDER BY property_name ASC;
  ");

  $savedTrigger = $operation->retrieveSingle("SELECT * FROM `property_trigger` WHERE property_identifier_sensor='" . $property_identifier . "' ORDER BY property_trigger_id DESC LIMIT 1");
  $associated_trigger = "savedTrigger";
  if ($savedTrigger) {
    $associated_trigger = $savedTrigger;
  }

  if (count($device_data) > 0) {
    $array_data = array(
      "total_records_highlight" => $device_data_total_records,
      "average_highlight" => $average,
      "most_recent_highlight" => $device_data,
      "graph_records" => $device_data_rows,
      "connected_sensors" => $device_propertiesRead,
      "connected_actuators" => $device_propertiesReadWrite,
      "associated_trigger" => $associated_trigger,
    );

    echo json_encode(["isError" => false, "msg" => "Device Data", "data" => $array_data]);
  } else
    echo json_encode(["isError" => true, "msg" => "No Device Data Found..."]);
} elseif (isset($_POST['property_identifier_sensor']) && !empty($_POST['property_identifier_sensor']) && isset($_POST['property_trigger_type']) && !empty($_POST['property_trigger_type']) && isset($_POST['property_value_trigger']) && !empty($_POST['property_value_trigger']) && isset($_POST['property_identifier_actuator']) && !empty($_POST['property_identifier_actuator']) && isset($_POST['property_trigger_action']) && !empty($_POST['property_trigger_action'])) {

  // echo "hehe";


  $property_identifier_sensor = addslashes($_POST['property_identifier_sensor']);
  $property_trigger_type = addslashes($_POST['property_trigger_type']);
  $property_value_trigger = addslashes($_POST['property_value_trigger']);
  $actuators_dropdown = addslashes($_POST['property_identifier_actuator']);
  $property_trigger_action = addslashes($_POST['property_trigger_action']);
  $property_trigger_period = isset($_POST['property_trigger_period']) && $_POST['property_trigger_period'] !== '' ? addslashes($_POST['property_trigger_period']) : null;

  $table = "property_trigger";
  $data = [
    'property_identifier_sensor' => "$property_identifier_sensor",
    'property_identifier_actuator' => "$actuators_dropdown",
    'property_value_trigger' => "$property_value_trigger",
    'property_trigger_type' => "$property_trigger_type",
    'property_trigger_action' => "$property_trigger_action",
    'property_trigger_period' => "$property_trigger_period"
  ];
  if ($operation->insertData($table, $data) == 1) {
    //get user id
    $savedTrigger = $operation->retrieveSingle("SELECT * FROM `property_trigger` WHERE property_identifier_sensor='" . $property_identifier_sensor . "' AND property_identifier_actuator ='" . $actuators_dropdown . "'");

    echo json_encode(["isError" => false, "msg" => "Device trigger saved", "data" => $savedTrigger]);
  } else {
    echo json_encode(["isError" => true, "msg" => "Failed saving device trigger"]);
  }
} elseif (isset($_POST['property_trigger_id']) && !empty($_POST['property_trigger_id']) && isset($_POST['eproperty_identifier_sensor']) && !empty($_POST['eproperty_identifier_sensor']) && isset($_POST['eproperty_trigger_type']) && !empty($_POST['eproperty_trigger_type']) && isset($_POST['eproperty_value_trigger']) && !empty($_POST['eproperty_value_trigger']) && isset($_POST['eproperty_identifier_actuator']) && !empty($_POST['eproperty_identifier_actuator']) && isset($_POST['eproperty_trigger_action']) && !empty($_POST['eproperty_trigger_action'])) {

  // echo "hehe";


  $property_trigger_id = addslashes($_POST['property_trigger_id']);
  $property_identifier_sensor = addslashes($_POST['eproperty_identifier_sensor']);
  $property_trigger_type = addslashes($_POST['eproperty_trigger_type']);
  $property_value_trigger = addslashes($_POST['eproperty_value_trigger']);
  $actuators_dropdown = addslashes($_POST['eproperty_identifier_actuator']);
  $property_trigger_action = addslashes($_POST['eproperty_trigger_action']);
  $property_trigger_period = isset($_POST['eproperty_trigger_period']) && $_POST['eproperty_trigger_period'] !== '' ? addslashes($_POST['eproperty_trigger_period']) : null;

  $table = "property_trigger";
  $data = [
    'property_identifier_sensor' => "$property_identifier_sensor",
    'property_identifier_actuator' => "$actuators_dropdown",
    'property_value_trigger' => "$property_value_trigger",
    'property_trigger_type' => "$property_trigger_type",
    'property_trigger_action' => "$property_trigger_action",
    'property_trigger_period' => "$property_trigger_period"
  ];
  $where  = "property_trigger_id = '$property_trigger_id'";

  if ($operation->updateData($table, $data, $where) == 1) {
    //get user id
    $savedTrigger = $operation->retrieveSingle("SELECT * FROM `property_trigger` WHERE property_identifier_sensor='" . $property_identifier_sensor . "' AND property_identifier_actuator ='" . $actuators_dropdown . "'");

    echo json_encode(["isError" => false, "msg" => "Device trigger saved", "data" => $savedTrigger]);
  } else {
    echo json_encode(["isError" => true, "msg" => "Failed saving device trigger"]);
  }
}elseif(isset($_GET['deleteTriggerId']) && !empty($_GET['deleteTriggerId'])){
    $deleteTriggerId = addslashes($_GET['deleteTriggerId']);
    $table = "property_trigger";
    $where = "property_trigger_id = '".$deleteTriggerId."'";
    if($operation->deleteData($table,$where)){
      echo json_encode(["isError" => false, "msg" => "Trigger deleted on device property!"]);
    }else{
      echo json_encode(["isError" => true, "msg" => "Failed to delete the given trigger!"]);
    }

} else {
  echo json_encode(["isError" => true, "msg" => "Unknown request"]);
}
