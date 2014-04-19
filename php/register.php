<?php

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

error_reporting(E_ALL);
require_once("reqs/validation.php");
require_once("reqs/common.php");

$db = new PDO("mysql:hostname=localhost;dbname=celiactracker","root","root");

$validate = new Validate($db);

$check = $validate->emailCheck($email);
if($check===true){
errormsg("Email already exists");
}

$check = $validate->userCheck($username);
if($check===true){
errormsg("Username already exists");
}

if($validate->validatePassword($password) == false){
	errormsg("Password must be at least 8 to 15 characters");
}
if($validate->validateEmail($email) == false){
	//errormsg("Not a valid signup");
	errormsg("Not a valid Email Address");
}

try{
	$protectPass = (md5($password));
	$st = $db->prepare(
		"INSERT INTO users(username, email, password)
		VALUES (:user, :email, :pass)"
	);

	$st->execute(array(
			":user"=>$username,
			":email"=>$email,
			":pass"=>$protectPass
		));

	$st = $db->prepare("SELECT LAST_INSERT_ID()");
	$st->execute();

	$lastid = $st->fetch();

	$username = $validate->getUser($lastid[0]);


}catch(PDOException $e){
	errormsg($e->getMessage());
 }

session_start();
session_regenerate_id(false);

$_SESSION["username"] = $username->id;

exitjson(array("username"=>$username));
?>