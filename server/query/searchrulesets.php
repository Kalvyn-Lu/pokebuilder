<?php

require_once("getquery.php");

$query = "SELECT * FROM ruleset as r GROUP BY r.id ORDER BY r.id ASC";

echo $json = to_json(run_query($query));

?>