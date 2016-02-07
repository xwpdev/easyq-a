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
                $tempUser->email, $tempUser->password, $tempUser->title, $tempUser->name, $tempUser->address, $tempUser->contact, '1');

            try {
                $result = DbHelper::runQuery($sql);
                return $result;

            } catch (Exception $ex) {

            }
            DbHelper::closeConn();
        }
    }

    public static function validateUser($email, $password)
    {
        DbHelper::openConn();

        $sql = sprintf("SELECT * FROM easyqadb.user as u WHERE u.email='%s' AND u.password='%s'", $email, $password);

        try {
            $result = DbHelper::runQuery($sql);
            $obj = new stdClass();
            if ($result->num_rows > 0) {
                // output data of each row
                while ($row = $result->fetch_assoc()) {
                    $obj->id = $row["id"];
                    $obj->email = $row["email"];
                    $obj->title = $row["title"];
                    $obj->name = $row["name"];
                    $obj->address = $row["address"];
                    $obj->contact = $row["contact"];
                    $obj->userType = $row["user_type_id"];
                    $obj->isActive = $row["is_active"];
                }
            } else {
                // echo "0 results";
            }

            return ($obj);
        } catch (Exception $ex) {

        }

        DbHelper::closeConn();
    }
}