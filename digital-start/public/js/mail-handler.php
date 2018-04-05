
<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
$root_doc = $_SERVER["DOCUMENT_ROOT"];
require $root_doc."/PHPMailer/src/Exception.php";
require $root_doc. "/PHPMailer/src/PHPMailer.php";
require $root_doc. "/PHPMailer/src/SMTP.php";


if(isset($_POST['submit'])) {
    $subject = $_POST["txtObj"];
    $name = $_POST['txtName'];
    $mess = $_POST["txtMess"];
    $phone = $_POST['txtTel'];
    $jour = $_POST['your-jour'];
    $heure = $_POST['your-heure'];
    $mailbox = $_POST['txtMail'];
    $headers .= "From ".$mailbox."\r\n";
    mail($to,$subject,$mess,$headers);


    mail("test@betaversion.xyz","".$subject,"Phone number ".$phone."\r\n"."Nom ".$name."\r\n"."".$mess."\r\n".$jour."\r\n".$heure,"".$headers);
}

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
//    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'testmail.bb12@gmail.com';                 // SMTP username
    $mail->Password = 'admin123456@#';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('test@betaversion.xyz', $name);
//    $mail->addAddress('joe@example.net', 'Joe User');     // Add a recipient
    $mail->addAddress('test@betaversion.xyz');               // Name is optional
//    $mail->addReplyTo('info@example.com', 'Information');

    //Attachments
//    $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//    $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    //Content
    // Set email format to HTML
    $message = '';
    $message .= "Nom: ".$name."\r\n";
    $message .= "Mail: ".$mailbox."\r\n";
    $message .= "Phone: ".$phone."\r\n";
    $message .= "Jour: ".$jour."\r\n";
    $message .= "Jour: ".$heure."\r\n";
    $mail->Subject = 'Contact form';
    $mail->Body = $message;



    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';

} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}