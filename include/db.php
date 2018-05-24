<?php
class database {
    const HOST = "localhost";
    const USER = "";
    const PASSWORD = "";
    const DATABASE = "";

    private $db_handle;

    function __construct() {
        $this->db_handle = new mysqli(self::HOST, self::USER, self::PASSWORD, self::DATABASE);
        if ($this->db_handle->connect_errno) {
            echo "Failed to connect to MySQL: (" . $this->db_handle->connect_errno . ") " . $this->db_handle->connect_error;
        }
	if (!$this->db_handle->set_charset("utf8")) {
	    printf("Error loading character set utf8: %s\n", $this->db_handle->error);
	}

	$this->set_group_concat_len();
    }

    function __destruct() {
        $this->db_handle->close();
    }

    private function set_group_concat_len() {
	$sql = "SET group_concat_max_len = @@max_allowed_packet";

	if (!$res = $this->db_handle->query($sql)) {
            echo "Error querying available fields";
        }
    }

    public function insert_field($text, $active) {
        if ($sql = $this->db_handle->prepare("INSERT INTO fields (active, text) VALUES (?, ?)")) {
            if ($sql->bind_param("is", $active, $text)) {
                $sql->execute();
            } else {
                echo "failed to bind parameter to insert statement";
            }
            $sql->close();
        } else {
            echo "Error preparing insert statement";
        }
    }

    public function delete_field($id) {
        if ($sql = $this->db_handle->prepare("DELETE FROM fields WHERE id=?")) {
            if ($sql->bind_param("i", $id)) {
                $sql->execute();
            } else {
                echo "failed to bind parameter to delete statement";
            }
            $sql->close();
        } else {
            echo "Error preparing delete statement";
        }
    }

    public function set_field_active($id, $active) {
    	if ($sql = $this->db_handle->prepare("UPDATE fields SET active=? WHERE id=?")) {
            if ($sql->bind_param("ii", $active, $id)) {
                $sql->execute();
            } else {
                echo "failed to bind parameter to update statement";
            }
            $sql->close();
        } else {
            echo "Error preparing update statement: " . $this->db_handle->error;
        }
    }

    public function list_fields($active) {
        $retval = array();

        if (!$res = $this->db_handle->query("SELECT id, text FROM fields WHERE active = " . $active)) {
            echo "Error querying available fields";
            return NULL;
        }

        while ($row = $res->fetch_assoc()) {
            array_push($retval, array("id" => $row['id'], "text" => $row['text']));
        }

        return $retval;
    }

    public function hash($activeonly = True) {
        $retval = array();

	$sql = "SELECT MD5(GROUP_CONCAT(CONCAT(text, active))) as hash FROM fields";
	if ($activeonly)
	   $sql = $sql . " WHERE active=1";

        if (!$res = $this->db_handle->query($sql)) {
            echo "Error querying available fields";
            return NULL;
        }

        $row = $res->fetch_assoc();

        return $row['hash'];
    }
}
?>
