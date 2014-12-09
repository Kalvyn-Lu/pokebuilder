<?php

/*
$item = 2027;

$mons= json_decode(to_json(run_query("SELECT * from species WHERE type1=3 || type2=3")));

$ids = array();
$i = 0;
foreach ($mons as $key=>$value) {
    $ids[$i++] = $mons[$key]->id;
}

foreach($ids as $key=>$value) {
    $moves = json_decode(to_json(run_query("SELECT * FROM moveset WHERE id=$value;")))[0];
    
    $movelist = explode(" ", $moves->moves);
    
    foreach($movelist as $key2=>$value2) {
        if (446 == $value2) {
            echo "$value gets it!<br>";
        }
    }
    $movelist = explode(" ", $moves->egg_moves);
    
    foreach($movelist as $key2=>$value2) {
        if (446 == $value2) {
            echo "$value gets it!<br>";
        }
    }
}

*/
require_once("getquery.php");

$s = get("species");

if (!$s){
    echo to_json(run_query("SELECT * FROM move"));
}

else{
    $moveset = json_decode(to_json(run_query("SELECT * FROM moveset WHERE id=$s")));
    
    $alldata = explode(" ", $moveset[0]->moves);
    
    $query=
    "SELECT
        *
    FROM
        move
    WHERE id=";
    
    $query.=implode(" OR ID=", $alldata);
    $result = run_query($query);
    $data = json_decode(to_json($result));
    
    foreach($data as $key=>$value) {
        $data[$key]->type = "learnset";
    }
        
    $eggdata = explode(" ", $moveset[0]->egg_moves);
    
    $equery=
    "SELECT
        *
    FROM
        move
    WHERE id=";
    
    $equery.=implode(" OR ID=", $eggdata);
    $eresult = run_query($equery);
    $edata = json_decode(to_json($eresult));
    
    foreach($edata as $key=>$value) {
        $data[$key]->type = "egg move";
    }
    
    echo json_encode($data);
}
?>