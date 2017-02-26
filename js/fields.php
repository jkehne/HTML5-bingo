<?php
require_once "../include/etag.php";
require_once "../include/db.php";

$db = new database();

do_etag($db);
header("Content-Type: application/javascript; charset=UTF-8");

$fields = $db->list_fields(1);
$notfirst = FALSE
?>
var JSONBingo = {"squares": [
<?php
	foreach ($fields as $field) {
		printf('%s{"square": "%s"}', $notfirst ? ",\n" : "", htmlentities($field['text']));
		$notfirst = TRUE;
	}
?>
]
};
