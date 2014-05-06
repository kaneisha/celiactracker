<?php
session_start();


require_once("reqs/common.php");

$db = new PDO("mysql:hostname=localhost;dbname=celiactracker","root","root");

$st = $db->prepare(
		"select * from searchHistory where userId= :user"
	);

$st->execute(array(
			":user"=>$_SESSION['username']
		));

$obj = $st->fetchAll();
echo json_encode($obj);





