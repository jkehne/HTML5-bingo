<?php
   require_once "include/db.php";

   $db = NULL;

   function init_db() {
       global $db;
       $db = new database();
   }

   function handle_insert() {
       global $db;

       if (isset($_POST['field'])) {
           $db->insert_field(htmlentities($_POST['field']), 0);
           echo "<p>Thank you! Your submission has been recorded</p>";
       }
    }

    init_db();
?>
<!DOCTYPE html>
<html>
  <head>
    <title>WGT-Bingo</title>
    <meta name="viewport" content="user-scalable=no, width=device-width">
    <link href="css/style.css" rel="stylesheet" type="text/css">
  </head>
  <body>
    <div id="container">
      <div id="header">Goth-Bingo</div>
      <div id="submit">
	<?php handle_insert(); ?>
	Please enter your suggestion here:
	<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
	  <input type="text" name="field" /><br />
	  <input type="submit" value="Submit" />
	</form>
      </div>
      <div id="hints">
	<a href="signin.html">Back to signin page</a>
      </div>
    </div>
  </body>
</html>
