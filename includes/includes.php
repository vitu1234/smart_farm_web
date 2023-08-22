<?php
require '../vendor/autoload.php';
$evn_file ="../.env";
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__, $evn_file);
$dotenv->load();
try {
    $dotenv->required(['API']);
}catch (Exception $e){
    echo $e->getMessage();
}

//$dotenv->safeLoad(); #avoid throwing errors
#echo $_ENV['VAR_NAME'];