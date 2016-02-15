<?php
/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/12/2016
 * Time: 7:55 AM
 */
require '../model/QuestionRepository.php';
$postData = json_decode(file_get_contents("php://input"), true);
$lecId = $postData["lecId"];
$qId = $postData["qId"];
$res = QuestionRepository::setLecturer($qId, $lecId);
echo json_encode($res);

