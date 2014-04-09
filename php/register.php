<?php

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

//error_reporting(E_ALL);
//require_once("reqs/common.php");

$db = new PDO("mysql:hostname=localhost;dbname=celiactracker","root","root");
//$dbh = new PDB();
//$db = $dbh->db;

//$account = new Account($db);

try{
	$protectPass = (md5($password));
	$st = $db->prepare(
		"INSERT INTO users(username, email, password)
		VALUES (:user, :email, :pass)"
	);

	$st->execute(array(
			":user"=>$username,
			":email"=>$email,
			":pass"=>$protectPass
		));

	$st = $db->prepare("SELECT LAST_INSERT_ID()");
	$st->execute();
}catch(PDOException $e){
	errormsg($e->getMessage());
 }




// class PDB{


// // public $db = null;

// public function start(){



// try{
// 	$this->db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
// }catch(PDOException $e){
// 	errormsg($e->getMessage());
// }

// }

// };



//$dbh = new PDB();
//$db = $dbh->db;

// $site = new Site($db);

// $exists = $site->checkName($username);
// if($exists===true){
// errormsg("Username already exists.");
// }

// $exists = $site->checkEmail($email);
// if($exists===true){
// errormsg("Email address already in use.");
// }


//$hashed = $site->hasher($username, $password);

// try{
// $st = $db->prepare("
// INSERT INTO users
// (username, email, password)
// VALUES (:user, :email, :pass)
// ");
// $st->execute(array(
// ":user"=>$username,
// ":pass"=>$password,
// ":email"=>$email
// ));

// $st = $db->prepare("SELECT LAST_INSERT_ID()");
// $st->execute();

// //$lastid = $st->fetch();

// //$user = $dbh->getUser($lastid[0]);


// }catch (PDOException $e){
// errormsg($e->getMessage());
// }

// session_start();
// session_regenerate_id(false);

// $_SESSION["user"] = $user->id;

// exitjson(array("user"=>$user));
?>