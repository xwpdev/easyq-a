<?php
/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/16/2016
 * Time: 5:38 AM
 */
require '../model/QuestionRepository.php';
header('Content-type: application/json');
$postData = json_decode(file_get_contents("php://input"), true);
$id = $postData["id"];
$response = QuestionRepository::getAnswersByQuestionId($id);
echo json_encode($response);