<?php
/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/7/2016
 * Time: 5:09 PM
 */

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}
// echo session_status();
echo print_r(sizeof($_SESSION));

echo json_encode($_SESSION["user"]);