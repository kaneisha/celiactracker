<?php

// error_reporting(E_ALL);

session_start();
//session_regenerate_id(false);
// $username = $_POST['username'];
// $password = $_POST['password'];
// $data = array("un"=>$_POST['username'],"pass"=>md5($_POST['password']));

require_once("reqs/common.php");
require_once("reqs/validation.php");

$db = new PDO("mysql:hostname=localhost;dbname=celiactracker","root","root");
$validate = new Validate($db);

if (!isset($_SESSION["username"])) {
errormsg("Not logged in.");
};

$userID = $_SESSION["username"];

$userdata = $validate->getUser($userID);
//$userdata->fetchAll();
// $isgood = $userdata->rowCount();

// if($isgood > 0){
// $_SESSION["loggedin"] = 1;
// return 1;
// }else{
// $_SESSION["loggedin"] = 0;

// return 0;
// }

exitjson(array( "username"=>$userdata ));

	//public function checkUser($data){
//session_start();
//$db = new PDO("mysql:hostname=localhost;dbname=ssl","root","root");

//$q = "select username, password from users where username = :un and password = :pass";
//$q = "select * from users where users.id = :user";

// $st = $db->prepare($q);

// $st->execute(array(":un"=>$data["un"], ":pass"=>$data["pass"]));

// $st->fetchAll();
// $isgood = $st->rowCount();

// if($isgood > 0){
// $_SESSION["loggedin"] = 1;
// return 1;
// }else{
// $_SESSION["loggedin"] = 0;

// return 0;
// }

// $data = array("un"=>$_POST["username"],"pass"=>md5($_POST["password"]));
// $test = $validate->checkUser($data);
// $msg="Invalid Login";

// if($test == 1){

// }


//}

?>