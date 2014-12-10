<?php

require_once("getquery.php");

$ruleset = get("rules");



$query = "
SELECT
    i.id as 'id',
    i.name as 'name',
    i.description as 'description'
FROM
    item as i";

if ($ruleset !== False) {
    $query .= " LEFT OUTER JOIN
        banitem as b ON
        i.id = b.item AND b.ruleset=$ruleset
    WHERE b.item IS NULL";
}

echo $json = to_json(run_query($query));


?>