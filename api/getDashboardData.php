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

$data = QuestionRepository::getQuestions($filter);

echo json_encode($data);