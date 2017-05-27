<?php
require_once "../include/db.php";
require_once "../include/etag.php";

$db = NULL;

function init_db() {
    global $db;
    $db = new database();
}

function handle_action() {
    global $db;

    if (!isset($_POST['action']) && !isset($_GET['action']))
        return;

    $action = isset($_POST['action']) ? $_POST['action'] : $_GET['action'];

    switch ($action) {
    case "insert":
        $db->insert_field($_POST['text'], 1);
        break;
    case "delete":
        $db->delete_field($_GET['id']);
        break;
    case "activate":
        $db->set_field_active($_GET['id'], 1);
        break;
    case "deactivate":
        $db->set_field_active($_GET['id'], 0);
        break;
    }
}

function output_table_row($id, $word, $active) {
    echo "<tr><td>";
    echo $word;
    echo '</td><td class="menu">';
    printf('<a href="index.php?action=%1$s&id=%2$d"><img src="img/%1$s.png" /></a>', $active ? "deactivate" : "activate", $id);
    echo "&nbsp;";
    printf('<a href="index.php?action=delete&id=%d"><img src="img/delete.png" /></a>', $id);
    echo "</td></tr>";
}

function list_fields() {
    global $db;
    $fields = $db->list_fields(0);
    foreach ($fields as $field) {
        output_table_row($field['id'], $field['text'], 0);
    }

    $fields = $db->list_fields(1);
    foreach ($fields as $field) {
        output_table_row($field['id'], $field['text'], 1);
    }
}

init_db();
do_etag($db, False);
?>
<!DOCTYPE html>
<html>
  <head>
    <title>WGT-Bingo admin area</title>
    <link rel="stylesheet" type="text/css" href="css/admin.css" />
  </head>
  <body>
    Insert new word:
    <form action="index.php" method="post">
      <input type="text" name="text">
      <input type="hidden" name="action" value="insert">
      <input type="submit" name="submit" value="Submit">
    </form>
    <br />
    <table>
    <?php
      handle_action();
      list_fields();
    ?>
    </table>
  </body>
</html>
