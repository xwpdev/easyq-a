<?php
/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/4/2016
 * Time: 3:10 PM
 */
require '../model/UserRepository.php';
require '../helpers/MailHelper.php';

header('Content-type: application/json');

$tempUser = new User();
$postData = json_decode(file_get_contents("php://input"), true);

$tempUser->email = $postData["userEmail"];
$tempUser->password = $postData["userPassword"];
$tempUser->title = $postData["userTitle"];
$tempUser->name = $postData["userName"];
$tempUser->address = $postData["userAddress"];
$tempUser->contact = $postData["userContact"];
$tempUser->type = $postData["userType"];
$tempUser->isActive = true;

$response = UserRepository::registerUser($tempUser);

MailHelper::sendEmail($tempUser->email,"Registration Success","You have successfully registered with the Easy Q & A.");

$obj = new stdClass;
$obj->d = $response;
$obj->s = true;

echo json_encode($obj);
