<?php

$username = $_POST['username'];
$password = $_POST['password'];

require_once("reqs/validation.php");
require_once("reqs/common.php");

$db = new PDO("mysql:hostname=localhost;dbname=celiactracker","root","root");

$validate = new Validate($db);

$data = array("un"=>$_POST["username"],"pass"=>md5($_POST["password"]));
$test = $validate->checkUser($data);
//$test = $validate->getUser($userID);
//$msg="Invalid Login";


if($test != 1){
	errormsg("Invalid Login");
}

session_start();
session_regenerate_id(false);

$_SESSION["username"] = $username->id;

exitjson(array("username"=>$username));


