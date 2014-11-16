<?php

require_once("getquery.php");

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