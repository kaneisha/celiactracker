<?php

class Validate{

public $db = null;

public function __construct($dbref){

$this->db = $dbref;
// 	try{
// //$this->db = new PDO("mysql:host=$this->dbhost;port=$this->dbport;dbname=$this->dbname", $this->dbuser, $this->dbpass);
// $this->db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

// }catch (PDOException $e){
// errormsg($e->getMessage());

// }



}

public function checkUser($data){
//session_start();
//$db = new PDO("mysql:hostname=localhost;dbname=ssl","root","root");

$q = "select username, password from users where username = :un and password = :pass";

$st = $this->db->prepare($q);

$st->execute(array(":un"=>$data["un"], ":pass"=>$data["pass"]));

$st->fetchAll();
$isgood = $st->rowCount();

if($isgood > 0){
$_SESSION["loggedin"] = 1;
return 1;
}else{
$_SESSION["loggedin"] = 0;

return 0;
}


}

public function getLogin($userid){

		$sql = "Select * from users where id= :id";
		//echo "run";
		$st = $dbs->prepare($sql);
		//echo "work";

		$st->execute(array(":id"=>$userid));
		//echo "runner";
		//"select name from users";

		$obj = $st->fetchAll();
		return $obj;


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

}

public function userCheck($username){

$check = false;
try{

$sql = $this->db->prepare("
SELECT username
FROM users
WHERE username = :user
");
$sql->bindParam(":user", $username);
$sql->execute();

$result = $sql->fetchAll(PDO::FETCH_OBJ);

if( count($result)>0 ){
$check = true;
}

}catch (PDOException $e){
errormsg($e->getMessage());
}

return $check;

}

public function getUser($userID){

try{
$st = $this->db->prepare("
SELECT id, username, email, password
FROM users
WHERE users.id = :user
");
$st->execute(array(
":user"=>$userID
));

}catch (PDOException $e){
errormsg($e->getMessage());
}

$st->setFetchMode(PDO::FETCH_OBJ);

$user = $st->fetch();

return $user;

}

}
?>