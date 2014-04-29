<?php

$name = $_POST['name'];
$ingredients = $_POST['ingredients'];

// require_once("reqs/validation.php");
require_once("reqs/common.php");

$db = new PDO("mysql:hostname=localhost;dbname=celiactracker","root","root");
// $validate = new Validate($db);

try{
	$st = $db->prepare(
		"INSERT INTO glutenfree(name, ingredients)
		VALUES (:name, :ings)"
	);

	$st->execute(array(
			":name"=>$name,
			":ings"=>$ingredients
		));


}catch(PDOException $e){
	errormsg("Did not save");
 }




