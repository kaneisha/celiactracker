<?php
session_start();

$item = $_POST['item'];
$ingredients = $_POST['ingredients'];

require_once("reqs/common.php");

$db = new PDO("mysql:hostname=localhost;dbname=celiactracker","root","root");

try{
	$st = $db->prepare(
		"INSERT INTO gluten (name, ingredients, userId)
		VALUES (:name, :ings, :user)"
	);

	$st->execute(array(
			":name"=>$item,
			":ings"=>$ingredients,
			":user"=>$_SESSION['username']
		));


}catch(PDOException $e){
	errormsg("Did not save");
 }




