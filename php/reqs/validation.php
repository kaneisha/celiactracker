<?php

class Validate{

public $db = null;

public function __construct($dbref){

$this->db = $dbref;

}

public function getLogin(){

	$email = $_POST["username_login"];
	$password = $_POST["password_login"];
	$email_match = '/^[a-zA-Z]+[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/';
	$password_match = '/^[a-zA-Z]\w{7,14}$/';


	if(preg_match($email_match, $email) && preg_match($password_match, $password)){
	return true;
	}else{
	//$loginErr = '*You put in the wrong information please try again';
	return false;

	}


}


public function validateEmail(){
	// $user = $_POST["user"];
	$email = $_POST["email"];
	$email_match = '/^[a-zA-Z]+[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/';

	if(preg_match($email_match, $email)){
	return true;
	}else{
	//$loginErr = '*You put in the wrong information please try again';
	return false;

	}

}

public function validatePassword(){
	// $user = $_POST["user"];
	$password = $_POST["password"];
	$password_match = '/^[a-zA-Z]\w{7,14}$/';

	if(preg_match($password_match, $password)){
	return true;
	}else{
	//$loginErr = '*You put in the wrong information please try again';
	return false;

	}

}

public function emailCheck($email){

	$check = false;
	try{

	$sql = $this->db->prepare("
	SELECT email
	FROM users
	WHERE email = :email
	");
	$sql->bindParam(":email", $email);
	$sql->execute();

	$result = $sql->fetchAll(PDO::FETCH_OBJ);

	if( count($result)>0 ){
	$check = true;
	}

	}catch (PDOException $e){
	errormsg($e->getMessage());
	}

	return $check;

} // checkName

}
?>