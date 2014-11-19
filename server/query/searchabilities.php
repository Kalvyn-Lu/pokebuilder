<?php

require_once("getquery.php");

$species = get("species");

$query = "
SELECT
    a.id as \"id\",
    a.name as \"name\",
    a.description as \"description\"
FROM
    ability as a";

if ($species) {
    $query.="
    ,
    species as s
WHERE
    s.id=$species
    AND a.id <>0
    AND (
        s.ability1=a.id OR
        s.ability2=a.id OR
        s.ability3=a.id
    )
;";
}
$result = run_query($query);
echo to_json($result);

?>