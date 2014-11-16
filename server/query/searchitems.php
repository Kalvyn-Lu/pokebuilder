<?php

require_once("getquery.php");

$query = "
SELECT
    i.'name' as \"name\",
    i.'description' as \"description\"
FROM
    'item' as i;";

$result = run_query($query);

?>