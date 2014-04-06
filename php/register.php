<?php

$user = '';
$email = '';
$pwd = '';

// $dbh = new PDB();
// $db = $dbh->db;

// $account = new Account($db);

// try{
// 	$st = $db->prepare(
// 		"INSERT INTO users(email, password)
// 		VALUES (:user, :email, :pwd)"
// 	);

// 	$st->execute(array(
// 			":user"=>$username,
// 			":email"=>$email,
// 			":pwd"=>$password
// 		));
// }

//public function addUser($user='', $email='', $pwd=''){
//try{
	$db = new PDO("mysql:hostname=localhost;dbname=celiactracker","root","root");

	$sql = "insert into users (username, email, password) values (:user, :email, :pass)";

	$statement = $db->prepare($sql);
	$statement->execute(array(":user"=>$user, ":email"=>$email, ":pass"=>$pwd));

	// if($statement->rowCount() > 0){
	// 	return false;
	// }else{
	// 	$sql = "insert into users (username, email, password) values (:un, :pass"
	// }
//}catch (PDOException $e){
//errormsg($e->getMessage());
//}

//addUser();
?>