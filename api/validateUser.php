<?php
/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/6/2016
 * Time: 10:50 PM
 */

require '../model/UserRepository.php';

header('Content-type: application/json');

if (session_status() !== PHP_SESSION_ACTIVE) {session_start();}

$postData = json_decode(file_get_contents("php://input"), true);
$userEmail = $postData["e"];
$pass = $postData["p"];

$response = UserRepository::validateUser($userEmail, $pass);

if ($response != null) {
    $_SESSION["user"] = $response;
}

$obj = new stdClass;
$obj->d = $response;
$obj->s = true;

echo json_encode($obj);