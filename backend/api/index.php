<?php
  header('Content-type: application/json');
  error_reporting(E_ALL); ini_set('display_errors', '1');

  include("../connection/Functions.php");
  $operation = new Functions();
if(isset($_GET['dashboard_setup']) && !empty($_GET['dashboard_setup']) && $_GET['dashboard_setup'] == 'true'){
    
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
    "readDevices" =>$device_propertiesRead,
    "readwriteDevices"=>$device_propertiesReadWrite
  );

  
  echo json_encode(["isError"=>false, "msg"=>"Registered devices", "data"=>$data]);
  
}elseif(isset($_GET['property_identifier']) && !empty($_GET['property_identifier']) && isset($_GET['wireless_device_identifier']) && !empty($_GET['wireless_device_identifier'])){
  $property_identifier = addslashes($_GET['property_identifier']);
  $wireless_device_identifier = addslashes($_GET['wireless_device_identifier']);
  $device_data_rows = $operation->retrieveMany("
  SELECT 
    property_reading, property_unit,   DATE_FORMAT(property_last_seen, '%Hh:%i') as property_last_seen
  FROM device_property
  WHERE device_property.property_identifier = '".$property_identifier."' AND wireless_device_identifier= '".$wireless_device_identifier."'
  ORDER BY device_property_id DESC LIMIT 50;
  ");

  $device_data = $operation->retrieveSingle("
  SELECT 
    *
  FROM device_property
  WHERE device_property.property_identifier = '".$property_identifier."' AND wireless_device_identifier= '".$wireless_device_identifier."'
  ORDER BY device_property_id DESC;
  ");

  $device_data_total_records = $operation->countAll("
  SELECT 
    *
  FROM device_property
  WHERE device_property.property_identifier = '".$property_identifier."' AND wireless_device_identifier= '".$wireless_device_identifier."'
  ORDER BY device_property_id DESC;
  ");
// $average = $operation->retrieveSingle("SELECT property_identifier, property_name, property_unit,property_reading, ROUND(AVG(property_reading)) AS average FROM `device_property` WHERE device_property.property_identifier = '".$property_identifier."' AND wireless_device_identifier= '".$wireless_device_identifier."'");
$average = $operation->retrieveSingle("
  SELECT subquery.property_identifier, subquery.property_name, subquery.property_unit, subquery.property_reading, ROUND(AVG(subquery.property_reading)) AS average
  FROM (
      SELECT property_identifier, property_name, property_unit, property_reading
      FROM device_property
      WHERE device_property.property_identifier = '".$property_identifier."' AND wireless_device_identifier= '".$wireless_device_identifier."'
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


  if(count($device_data) > 0){ 
    $array_data = array(
      "total_records_highlight" =>$device_data_total_records,
      "average_highlight" =>$average,
      "most_recent_highlight"=>$device_data,
      "graph_records" =>$device_data_rows,
      "connected_sensors" =>count($device_propertiesRead),
      "connected_actuators" =>count($device_propertiesReadWrite),
      
    );
    


    echo json_encode(["isError"=>false, "msg"=>"Device Data", "data"=>$array_data]);
  }else
   echo json_encode(["isError"=>true, "msg"=>"No Device Data Found..."]);
}else{
  echo json_encode(["isError"=>true, "msg"=>"Unknown request"]);
}