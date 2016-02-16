<?php
/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/15/2016
 * Time: 11:00 PM
 */

require '../model/QuestionRepository.php';
header('Content-type: application/json');
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

$postData = json_decode(file_get_contents("php://input"), true);
$id = $postData["id"];

$response = QuestionRepository::getUserById($id);

echo json_encode($response);