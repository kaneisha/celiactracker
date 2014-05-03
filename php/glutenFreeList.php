<?php
session_start();


require_once("reqs/common.php");

$db = new PDO("mysql:hostname=localhost;dbname=celiactracker","root","root");
// $user = $_SESSION["username"];

// var_dump($_SESSION["username"]);
// exit;

$st = $db->prepare(
		"select * from glutenfree where user_id= :user"
	);

$st->execute(array(
			":user"=>$_SESSION['username']
		));

$obj = $st->fetchAll();
//json_encode($obj);
echo json_encode($obj);

// var_dump($obj);
// exit;




