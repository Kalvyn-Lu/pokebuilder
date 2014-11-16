<?php

require_once("getquery.php");

$query = "
SELECT
    item.name as 'name',
    item.description as 'description'
FROM
    item as item;";

$result = run_query($query);


echo $json = to_json($result);


?>