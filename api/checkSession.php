<?php
/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/7/2016
 * Time: 9:26 AM
 */
require '../helpers/SessionHelper.php';
header('Content-type: application/json');
if (session_status() !== PHP_SESSION_ACTIVE) {session_start();}
$res = SessionHelper::checkUserSession();
echo json_encode($res);