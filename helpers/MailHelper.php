<?php
/**
 * Created by PhpStorm.
 * User: Charith
 * Date: 2/4/2016
 * Time: 11:36 AM
 */
/** TEST */
MailHelper::sendEmail('charith.suriyakula@gmail.com', 'Test Email', '<span>Sample Text</span>');

class MailHelper
{
    public function sendEmail($to, $subject, $message)
    {
        // Always set content-type when sending HTML email
        $headers = "MIME-Version: 1.0" . "\r\n" . "Content-type:text/html;charset=UTF-8" . "\r\n" . "From: noreply.testdev@gmail.com" . "\r\n";

        try {
            mail($to, $subject, $message, $headers);
            echo "Mail Sent";
        } catch (Exception $ex) {
            echo $ex->getMessage();
        }
    }
}