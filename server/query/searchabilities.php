<?php

require_once("getquery.php");

$ability = $_GET["ability"];

if (!$ability) {
    die("No ability provided!");
}

$query = "
SELECT
    a.name as \"abilities\",
    a.description as \"description\"
FROM
    ability as a,
    species as s
WHERE
    a.id=$ability
    AND (
    
        s.ability1=a.id OR
        s.ability2=a.id OR
        s.ability3=a.id 
    )
;";

$result = run_query($query);
echo dump($result);

?>