<?php
session_start();

//$itemid = $_GET['id'];

require_once("reqs/common.php");

$db = new PDO("mysql:hostname=localhost;dbname=celiactracker","root","root");

try{
	$st = $db->prepare(
		"DELETE from searchHistory
		WHERE userId = :user"
	);

	$st->execute(array(
			":user"=>$_SESSION['username']
		));


}catch(PDOException $e){
	errormsg($e->getMessage());
 }




