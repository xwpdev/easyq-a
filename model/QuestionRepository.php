<?php

/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/7/2016
 * Time: 3:03 PM
 */
class QuestionRepository
{
    public static function saveQuestion($tempQ = null)
    {
        if ($tempQ != null) {
            DbHelper::openConn();

            $sql = sprintf("INSERT INTO easyqadb.question(title, text, user_id, asked_date) VALUES ('%s','%s','%u','%s')",
                $tempQ->title, $tempQ->text, $tempQ->userId, $tempQ->date);

            try {
                $result = DbHelper::runQuery($sql);
                return $result;

            } catch (Exception $ex) {

                DbHelper::closeConn();
            }
        }
    }

    public static function saveTags($tagStr = "")
    {

    }
}