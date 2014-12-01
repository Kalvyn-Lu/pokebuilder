<?php

require_once("getquery.php");

$movefile = fopen("all_moves.txt", 'r');
$eggfile = fopen("egg_moves.txt", 'r');

$allmoves = array();
$eggmoves = array();
if ($movefile && $eggfile) {
    while (($buffer = fgets($movefile)) !== false) {
        $id = substr($buffer, 0, strpos($buffer, ':'));
        $allmoves[$id] = str_replace("\r\n", "", substr($buffer, strpos($buffer, ' ') + 1, strlen($buffer)));
    }
    
    while (($buffer = fgets($eggfile)) !== false) {
        $id = substr($buffer, 0, strpos($buffer, ':'));
        $eggmoves[$id] = str_replace("\r\n", "", substr($buffer, strpos($buffer, ' ') + 1, strlen($buffer)));
    }
}

$stuff = array();

foreach ($allmoves as $key=>$value) {
    if (array_key_exists($key, $eggmoves)) {
        $stuff[$key] = "($key,\"".$allmoves[$key]."\",\"".$eggmoves[$key]."\")";
    }
    else {
        $stuff[$key] = "($key,\"".$allmoves[$key]."\",\"\")";
    }
}

$output = fopen("makemoves.txt", 'w');

fwrite($output, "INSERT INTO movesets (id, moves, egg_moves) VALUES \n".implode(",\n",$stuff));

?>