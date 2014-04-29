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


try{
$st = $db->prepare("select * from users where username = :user and password = :pass");

$st->execute(array(
			":user"=>$username,
			":pass"=>$passMD5
		));

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




