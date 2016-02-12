<?php
/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/4/2016
 * Time: 3:00 PM
 */

require 'User.php';
require '../helpers/DbHelper.php';

class UserRepository
{
    public static function getUserTypes()
    {
        $obj = new stdClass();
        DbHelper::openConn();

        try {
            $sql = sprintf("SELECT * FROM easyqadb.user_type");
            $result = DbHelper::runQuery($sql);

            $obj->data = array();

            while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                $rows['id'] = $r['id'];
                $rows['type'] = $r['type'];

                array_push($obj->data, $rows);
            }

            $result->free();

            $obj->s = true;
            return $obj;
        } catch (Exception $ex) {
            $obj->s = false;
            return $obj;
        } finally {
            DbHelper::closeConn();
        }
    }

    public static function registerUser($tempUser = null)
    {
        if ($tempUser != null) {

            DbHelper::openConn();

            $sql = sprintf("INSERT INTO easyqadb.user(email,password,title,name,address,contact,user_type_id,is_active) VALUES ('%s','%s','%s','%s','%s','%u','%u','%s')",
                $tempUser->email, $tempUser->password, $tempUser->title, $tempUser->name, $tempUser->address, $tempUser->contact, $tempUser->type, '1');

            try {
                $result = DbHelper::runQuery($sql);
                return $result;

            } catch (Exception $ex) {

            } finally {
                DbHelper::closeConn();
            }
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

        } finally {
            DbHelper::closeConn();
        }

    }
}