<?php
session_start();

$_SESSION['access'] = $_POST['access'];
$_SESSION['refresh'] = $_POST['refresh'];
$_SESSION['user_id'] = $_POST['id'];
$_SESSION['username'] = $_POST['username'];
$_SESSION['email'] = $_POST['email'];
$_SESSION['first_name'] = $_POST['first_name'];
$_SESSION['last_name'] = $_POST['last_name'];
