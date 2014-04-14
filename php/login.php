<?php

require_once("reqs/validation.php");
require_once("reqs/common.php");

$db = new PDO("mysql:hostname=localhost;dbname=celiactracker","root","root");

$validate = new Validate($db);

$data = array("un"=>$_POST["username"],"pass"=>md5($_POST["password"]));
$test = $validate->checkUser($data);
//$msg="Invalid Login";


if($test != 1){
	errormsg("Invalid Login");
}

//$validate = new Validate($db);

// try{
// 	$sql = "Select * from users where id= :id";
// 		//echo "run";
// 	$st = $db->prepare($sql);
// 		//echo "work";

// 	$st->execute(array(":id"=>$userid));
// 		//echo "runner";
// 		//"select name from users";

// 	$obj = $st->fetchAll();
// 	return $obj;
// }catch(PDOException $e){
// 	errormsg($e->getMessage());
// }

// $st->setFetchMode(PDO::FETCH_OBJ);

// $row = $st->fetch();

// if($st->rowCount() == 0){
// errormsg("Username or password incorrect.");
// };


