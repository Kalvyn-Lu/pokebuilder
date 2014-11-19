<?php

require_once("getquery.php");

$s = get("species");

if (!$s){
    echo to_json(run_query("SELECT * from move"));
}

else{
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

    $query=
    "SELECT
        *
    FROM
        move
    WHERE id=";
    
    $query.=implode(" OR id=", $alldata);
    $result = run_query($query);
    echo to_json($result);
}
?>