<?php


require_once("getquery.php");

$handle = @fopen("regulations.txt", "r");

$query = "INSERT INTO banspecies (ruleset, species) VALUES ";
if ($handle) {
    while (($buffer = fgets($handle)) !== false) {
        $buffer = substr($buffer, 0, strlen($buffer) - 2);
        $ids = json_decode(to_json(run_query("
            SELECT id FROM species WHERE name=\"$buffer\"
        ")));
        $query.="(1, ".$ids[0]->id."),";
    }
}
echo $query;
run_query(substr($query, 0, strlen($query) - 1));
die("Done!");

?>