<?php
/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/8/2016
 * Time: 4:29 AM
 */
require '../model/QuestionRepository.php';

header('Content-type: application/json');

$postData = json_decode(file_get_contents("php://input"), true);

$filter = $postData["f"];

$questionData = QuestionRepository::getQuestions($filter);

$lecData = QuestionRepository::getLecturers();

$obj = new stdClass();
$obj->qData = $questionData;
$obj->lData = $lecData;
$obj->s = true;

echo json_encode($obj);