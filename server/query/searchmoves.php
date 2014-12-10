<?php

require_once("getquery.php");

$s = get("species");
$ruleset = get("ruleset");

$query = "
SELECT
    m.*
FROM
    move as m";


$where = array();
$i = 0;
if ($ruleset !== False) {
    $query .= " LEFT OUTER JOIN banmove as b ON
        m.id = b.move AND b.ruleset=$ruleset";
    $where[$i++] = "(b.move IS NULL)";
}


if ($s){
    $subq = json_decode(to_json(run_query("
        SELECT * FROM moveset WHERE id=$s
    ")));
    $moves = "(".
        implode(", ",
            explode(" ", $subq[0]->moves)).")";
    $egg_moves = "(".
        implode(", ",
            explode(" ", $subq[0]->egg_moves)).")";
    $where[$i++] = "(m.id IN $moves".
        ($subq[0]->egg_moves ? " OR m.id IN $egg_moves)" : ")");
}

$where = "WHERE ".implode(" AND ", $where);

echo to_json(run_query("$query $where"));






?>