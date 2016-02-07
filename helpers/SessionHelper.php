<?php

/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/7/2016
 * Time: 9:39 AM
 */
class SessionHelper
{
    public static function checkUserSession()
    {
        $obj = new stdClass();

        if (array_key_exists("user", $_SESSION)) {
            $tempUser = $_SESSION["user"];
            if (isset($tempUser) && !empty($tempUser)) {
                $obj->s = true;
                $obj->id = $tempUser->id;
                $obj->uname = $tempUser->name;
                $obj->name = $tempUser->name;
                $obj->email = $tempUser->email;
                $obj->type = $tempUser->userType;

                return $tempUser;
            } else {
                $obj->s = false;
                $obj->e = "Session Error";
            }
        } else {
            $obj->s = false;
            $obj->e = "User not found";
        }
        return $obj;
    }

    public static function getItemBySessionKey($key)
    {
        if (array_key_exists($key, $_SESSION)) {
            $temp = $_SESSION[$key];
            return $temp;
        } else {
            return null;
        }
    }
}