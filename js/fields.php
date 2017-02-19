<?php
require "../include/db.php";

$db = new database();
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
