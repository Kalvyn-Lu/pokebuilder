<?php

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