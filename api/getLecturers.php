<?php
/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/11/2016
 * Time: 7:22 AM
 */
require '../model/UserRepository.php';
header('Content-type: application/json');
$obj = UserRepository::getLecturers();
echo json_encode($obj);