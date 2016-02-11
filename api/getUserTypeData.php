<?php
/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/11/2016
 * Time: 4:27 AM
 */

require '../model/UserRepository.php';
$obj = UserRepository::getUserTypes();

echo  json_encode($obj);