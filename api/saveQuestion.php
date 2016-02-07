<?php
/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/7/2016
 * Time: 3:04 PM
 */

require '../model/Question.php';
require '../model/QuestionRepository.php';
require '../helpers/SessionHelper.php';

header('Content-type: application/json');

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

$tempUser = SessionHelper::checkUserSession();

$postData = json_decode(file_get_contents("php://input"), true);
$title = $postData["qTitle"];
$desc = $postData["qDesc"];
$tags = $postData["qTags"];

$question = new Question();
$question->title = $title;
$question->text = $desc;
$question->askedDate = getdate();
$question->userId = $tempUser->id;

$response = QuestionRepository::saveQuestion($question);

$response = QuestionRepository::saveTags($tags);

echo json_encode($question);