<?php
/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/16/2016
 * Time: 8:09 AM
 */
require '../model/Answer.php';
require '../model/QuestionRepository.php';
require '../helpers/SessionHelper.php';
header('Content-type: application/json');

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}
$tempUser = SessionHelper::checkUserSession();
$postData = json_decode(file_get_contents("php://input"), true);
$id = $postData["id"];
$ans = $postData["ans"];

$answer = new Answer();
$answer->questionId = $id;
$answer->userId = $tempUser->id;
$answer->text = $ans;

$response = QuestionRepository::saveAnswer($answer);

echo json_encode($response);