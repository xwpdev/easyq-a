<?php

class DbHelper
{
    public static $conn;

    public function openConn()
    {
        $serverName = "127.0.0.1";
        $username = "root";
        $password = "";
        $dbName = "easyqadb";

        // CLOUD
        // $serverName = "mysql2.gear.host";
        // $username = "easyqadb";
        // $password = "Tk00_4?XmoO9";
        // $dbName = "easyqadb";

        // Create connection
        self::$conn = new mysqli($serverName, $username, $password, $dbName);

        // Check connection
        if (self::$conn->connect_error) {
            die("Connection failed: " . self::$conn->connect_error);
        }

        return self::$conn;
    }

    public function runQuery($sql)
    {
        $result = self::$conn->query($sql);

        return $result;
    }

    public function closeConn()
    {
        self::$conn->close();
    }
}

/** TEST METHOD */
//$sql = "SELECT * FROM easyqadb.user_type";
//
//$isOpen = DbHelper::openConn();
//
//if ($isOpen) {
//    echo 'Connection OK';
//
//    $result = DbHelper::runQuery($sql);
//
//    if ($result->num_rows > 0) {
//        // output data of each row
//        while ($row = $result->fetch_assoc()) {
//            echo "Type: " . $row["type"] . "<br>";
//        }
//    } else {
//        echo "0 results";
//    }
//
//    DbHelper::closeConn();
//}

