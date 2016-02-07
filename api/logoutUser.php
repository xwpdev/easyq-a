<?php
/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/7/2016
 * Time: 11:45 AM
 */
session_start();

// remove all session variables
session_unset();

// destroy the session
session_destroy();

$obj = new stdClass();

$obj->s = true;

echo json_encode($obj);