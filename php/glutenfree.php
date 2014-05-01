<?php
session_start();

$name = $_POST['name'];
$ingredients = $_POST['ingredients'];

// var_dump($_SESSION['username']);
// exit;

// $name = 'test name';
// $ingredients = 'test ingredients';

// $user = $_POST['user'];

// require_once("login.php");
require_once("reqs/common.php");

$db = new PDO("mysql:hostname=localhost;dbname=celiactracker","root","root");
// $validate = new Validate($db);

try{
	$st = $db->prepare(
		"INSERT INTO glutenfree (name, ingredients, user_id)
		VALUES (:name, :ings, :user)"
	);

	$st->execute(array(
			":name"=>$name,
			":ings"=>$ingredients,
			":user"=>$_SESSION['username']
		));


}catch(PDOException $e){
	errormsg("Did not save");
 }




