<?php


require_once("getquery.php");

$item = 2027;

run_query("INSERT INTO banitem (ruleset, item) VALUES
(4,$item),
(5,$item),
(6,$item),
(7,$item),
(10,$item),
(11,$item),
(12,$item),
(13,$item)
");

die("Done.");

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

die("Done!");

?>