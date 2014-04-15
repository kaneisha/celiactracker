<?php

error_reporting(E_ALL);

session_start();
session_regenerate_id(false);

require_once("reqs/common.php");
require_once("reqs/validation.php");

$db = new PDO("mysql:hostname=localhost;dbname=celiactracker","root","root");
$validate = new Validate($db);

if (!isset($_SESSION["username"])) {
errormsg("Not logged in.");
};

$userID = $_SESSION["username"];

$userdata = $validate->getUser($userID);

exitjson(array( "username"=>$userdata ));

?>