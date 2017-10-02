<?php
require_once "../include/etag.php";
require_once "../include/db.php";

$db = new database();

do_etag($db);
header("Content-Type: application/javascript; charset=UTF-8");

$fields = $db->list_fields(1);
$notfirst = FALSE;
if ($_GET['pure_json'] == '1')
   printf('{"squares": [');
else
   printf('var JSONBingo = {"squares": [');

foreach ($fields as $field) {
	printf('%s{"square": "%s"}', $notfirst ? ",\n" : "", $_GET['pure_json'] == '1' ? $field['text'] : htmlentities($field['text']));
	$notfirst = TRUE;
}
?>
]
};
