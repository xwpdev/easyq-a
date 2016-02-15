<?php
/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/14/2016
 * Time: 8:30 PM
 */
require '../model/QuestionRepository.php';
header('Content-type: application/json');
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

$postData = json_decode(file_get_contents("php://input"), true);
$id = $postData["id"];

$response = QuestionRepository::getQuestionById($id);

// $user = QuestionRepository::getUserById($response->data['0']['user_id']);

echo json_encode($user);
echo json_encode($response);