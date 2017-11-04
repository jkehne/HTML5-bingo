<?php
   require_once "include/db.php";
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
       http_response_code(405);
       exit();
    }

    if (!isset($_POST['field'])) {
       http_response_code(400);
       exit();
    }

    $db = new database();
    $db->insert_field(htmlentities($_POST['field']), 0);
?>
