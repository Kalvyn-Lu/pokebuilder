<?php

require_once("getquery.php");

$species = $_GET["species"];

if (!$species) {
    die("No species provided!");
}

$query = "
SELECT
    a.id as \"id\",
    a.name as \"name\",
    a.description as \"description\"
FROM
    ability as a,
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
echo "$query<br>";
$result = run_query($query);
echo to_json($result);

?>