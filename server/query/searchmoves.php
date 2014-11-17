<?php

require_once("getquery.php");

if (! ($s = get("species"))) {
    die("[]");
}

$eggfile = file_get_contents("egg_moves.txt");
$elist = explode("\r\n", $eggfile);
$elist[0] = substr($elist[0], 0);
$eggdata = array();
foreach ($elist as $value) {
    $pos = strpos($value, ":");
    $id = substr($value, 0, $pos);
    if ($id != $s) {
        continue;
    }
    $eggdata = explode(" ", $value);
    $eggdata = array_splice($eggdata, 1);
    break;
}

$allfile = file_get_contents("all_moves.txt");
$alist = explode("\r\n", $allfile);
$alist[0] = substr($alist[0], 0);
$alldata = array();
foreach ($alist as $value) {
    $pos = strpos($value, ":");
    $id = substr($value, 0, $pos);
    if ($id != $s) {
        continue;
    }
    $alldata = explode(" ", $value);
    $alldata = array_splice($alldata, 1);
    break;
}

$str = "[";
foreach ($alldata as $key=>$value) {
    $str .= to_json(run_query("
    SELECT
        *
    FROM
        move
    WHERE
        id=$value
    ;"));
}

$str .= "]";

die($str);


$query = "
SELECT
    m.name as \"move\",
    m.power as \"power\",
    m.accuracy as \"accuracy\",
    m.category as \"category\",
    m.pp as \"pp\",
FROM    
    move as m
";

$result = run_query($query);

echo to_json($result);

?>