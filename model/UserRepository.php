<?php
require 'User.php';
require '../helpers/DbHelper.php';

/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/4/2016
 * Time: 3:00 PM
 */
class UserRepository
{
    public static function registerUser($tempUser = null)
    {
        if ($tempUser != null) {

            DbHelper::openConn();

            $sql = sprintf("INSERT INTO easyqadb.user(email,password,title,name,address,contact,user_type_id,is_active) VALUES ('%s','%s','%s','%s','%s','%u','2','%s')",
                $tempUser->email,$tempUser->password,$tempUser->title,$tempUser->name,$tempUser->address,$tempUser->contact,'1');

            try {
                $result = DbHelper::runQuery($sql);
                return $result;

            } catch (Exception $ex) {

            }
            DbHelper::closeConn();
        }
    }
}