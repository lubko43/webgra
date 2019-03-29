<?php
$text =  ($_POST['Surname']);
echo $text;
mail('andreikiv_ann@ukr.net','My subject',$text);
$success = mail('andreikiv_ann@ukr.net', 'My Subject', $text);
if (!$success) {
    echo "yes";
    $errorMessage = error_get_last()['message'];
}

?>