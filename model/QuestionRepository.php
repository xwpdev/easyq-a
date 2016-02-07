<?php
/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/7/2016
 * Time: 3:03 PM
 */
require '../helpers/DbHelper.php';

class QuestionRepository
{
    public static function saveQuestion($tempQ = null)
    {
        if ($tempQ != null) {
            $con = DbHelper::openConn();

            $sql = sprintf("INSERT INTO easyqadb.question(title, text, user_id, asked_date) VALUES ('%s','%s','%u','%s')",
                $tempQ->title, $tempQ->text, $tempQ->userId, date_create()->format('Y-m-d H:i:s'));

            try {
                $result = DbHelper::runQuery($sql);

                if ($result == 1) {
                    $newId = mysqli_insert_id($con);
                } else {
                    $newId = 0;
                }

                return $newId;

            } catch (Exception $ex) {
                return 0;
            } finally {
                DbHelper::closeConn();
            }
        }
    }

    public static function saveTags($tagArr, $qId = 0)
    {
        $con = DbHelper::openConn();

        try {
            for ($i = 0; $i < sizeof($tagArr); $i++) {
                $sql = sprintf("CALL TagCreate('%s',%u)", $tagArr[$i]['text'], $qId);
                DbHelper::runQuery($sql);
            }
            return true;

        } catch (Exception $ex) {
            return false;
        } finally {
            DbHelper::closeConn();
        }
    }
}