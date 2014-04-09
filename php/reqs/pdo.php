<?php

error_reporting(E_ALL);

class PDB{

private $dbhost = 'localhost';
private $dbport = '8889';
private $dbname = 'celiactracker';
private $dbuser = 'root';
private $dbpass = 'root';

public $db = null;


public function __construct(){

try{
$this->db = new PDO("mysql:host=$this->dbhost;port=$this->dbport;dbname=$this->dbname", $this->dbuser, $this->dbpass);
$this->db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

}catch (PDOException $e){
errormsg($e->getMessage());

}

} // __construct


public function __destruct(){

$this->db = null;

} // __destruct



// public function getUser($userID){

// try{
// $st = $this->db->prepare("
// SELECT id, username, email, password
// FROM users
// WHERE users.id = :user
// ");
// $st->execute(array(
// ":user"=>$userID
// ));

// }catch (PDOException $e){
// errormsg($e->getMessage());
// }

// $st->setFetchMode(PDO::FETCH_OBJ);

// $user = $st->fetch();

// return $user;

// }


}

?>