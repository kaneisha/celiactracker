<?php
//session_start();

$itemid = $_GET['id'];

require_once("reqs/common.php");

$db = new PDO("mysql:hostname=localhost;dbname=celiactracker","root","root");

try{
	$st = $db->prepare(
		"DELETE from gluten
		WHERE id = :id"
	);

	$st->execute(array(
			":id"=>$itemid
		));


}catch(PDOException $e){
	errormsg($e->getMessage());
 }




