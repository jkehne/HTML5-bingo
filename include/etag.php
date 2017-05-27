<?php
require_once "db.php";

function do_etag($db, $activeonly = True) {
	 $etag = $db->hash($activeonly);

	 if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && trim($_SERVER['HTTP_IF_NONE_MATCH']) == $etag) {
	    header("HTTP/1.1 304 Not Modified");
	    exit;
	 }

	 header("Etag: $etag");
}
?>
