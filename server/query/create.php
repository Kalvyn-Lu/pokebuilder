<?php

require_once("getquery.php");


$released = file_get_contents("all_moves.txt");
$rlist = explode("\r\n", $released);
$rlist[0] = substr($rlist[0], 0);
$query = "";
foreach ($rlist as $value) {
    $pos = strpos($value, ":");
    $id = substr($value, 0, $pos);
    $data = explode(" ", $value);
    for ($i = 1; $i < count($data); $i++){
        run_query("INSERT INTO moveset (move, species, method) VALUES ($data[$i], $id, 'gameplay');\n");
    }
}
//file_put_contents("output.sql", $query);
die("Done!");


$json = json_decode(file_get_contents("dupes.json"));

echo $query = "
SELECT *
FROM moveset
WHERE
move=".$json[0]["move"]."
AND species=".$json[0]["species"]."
";
die(to_json(run_query($query)));

$names = file_get_contents("items.txt");
$descs = file_get_contents("items_description.txt");

$nlist = explode("\n", $names);
$dlist = explode("\n", $descs);
$nlist[0] = substr($nlist[0], 3);
$dlist[0] = substr($dlist[0], 3);

$n = array();
$d = array();
foreach ($nlist as $key=>$value) {
    $id = substr($value, 0, strpos($value, " "));
    
    $str = substr($value, strpos($value, " ") + 1);
    $n[$id] = $str;
    if (!($str) || strlen($str) == 0) {
        $n[$id] = "-";
    }
}
foreach ($dlist as $key=>$value) {
    $id = substr($value, 0, strpos($value, " "));
    
    $str = substr($value, strpos($value, " ") + 1);
    $d[$id] = $str;
    if (!$str || strlen($str) == 0) {
        $d[$id] = "-";
    }
}


foreach ($n as $key=>$value){
    echo "$key $n[$key] $d[$key]<br>";
    $result = run_query("INSERT INTO item (id, name, description) 
        VALUES ($key, '$n[$key]', '$d[$key]');");
    echo "Inserted $key.<br>";
}

?>