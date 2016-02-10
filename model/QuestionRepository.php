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

    public static function getQuestions($filter)
    {
        $obj = new stdClass();
        $con = DbHelper::openConn();

        try {
            $sql = sprintf("SELECT * FROM easyqadb.question");

            /**
             * 1 - All
             * 2 - Unassigned
             * 3 - Unanswered
             * 4 - Assigned & Answered
             */
            switch ($filter) {
                case "1":
                    break;
                case "2":
                    break;
                case "3":
                    break;
                case "4":
                    $sql .= sprintf(" WHERE assigned_user_id IS NOT NULL");
                    break;
                default:
                    break;
            }

            $sql .=sprintf(" ORDER BY asked_date DESC");

            $result = DbHelper::runQuery($sql);

            $obj->data = array();

            while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                $rows['id'] = $r['id'];
                $rows['title'] = $r['title'];
                $rows['text'] = $r['text'];
                $rows['asked_date'] = $r['asked_date'];

                array_push($obj->data, $rows);
            }

            $result->free();

            $obj->s = true;

        } catch (Exception $ex) {
            $obj->s = false;
        } finally {
            DbHelper::closeConn();
            return $obj;
        }
    }
}