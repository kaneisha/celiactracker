<?php
// session_start();
// session_regenerate_id(false);

$username = $_POST['username'];
$password = $_POST['password'];

$passMD5 = md5($password);

// require_once("reqs/validation.php");
require_once("reqs/common.php");

$db = new PDO("mysql:hostname=localhost;dbname=celiactracker","root","root");
// $validate = new Validate($db);

// $st = $db->prepare("select * from users where username = :user and password = :pass");

// $t = $st->execute(array(
// 	":user" => $username,
// 	":pass" => $passMD5
// 	));



// $row = $st->fetch();


// // return json_encode($obj);
// echo json_encode($row);

// // session_start();
// // session_regenerate_id(false);
// $_SESSION['username'] = $row->id;
// exitjson(array("username"=>$row));



// $data = array("un"=>$_POST["username"],"pass"=>md5($_POST["password"]));
// $test = $validate->checkUser($data);
// //$test = $validate->getUser($data);
// $msg="Invalid Login";


// session_start();
// session_regenerate_id(false);

// $_SESSION["username"] = $username->id;

// exitjson(array("username"=>$username));

try{
$st = $db->prepare("select * from users where username = :user and password = :pass");
// $st->bindParam(":user", $username);
// $st->bindParam(":pass", $hashed["hash"]);
$st->execute(array(
			":user"=>$username,
			":pass"=>$passMD5
		));
//$st = $db->prepare("SELECT LAST_INSERT_ID()");
//$st->execute();

// $lastid = $st->fetch();

// $username = $validate->getUser($lastid[0]);

}catch (PDOException $e){
errormsg($e->getMessage());
}



$st->setFetchMode(PDO::FETCH_OBJ);

$row = $st->fetch();


if($st->rowCount() === 0){
errormsg($row);
};

session_start();
session_regenerate_id(false);
$_SESSION['username'] = $row->id;
exitjson(array("username"=>$row));




