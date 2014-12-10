<?php

require_once("getquery.php");

$ruleset = get("ruleset");

$type1 = get("type1") ;
$type2 = get("type2") ;

$move0 = get("move1") ;
$move1 = get("move2") ;
$move2 = get("move3") ;
$move3 = get("move4") ;
$moves = $move0 || $move1 || $move2 || $move3;

$ability = get("ability") ;

$maxhp = get("maxhp") ;
$maxatk = get("maxatk") ;
$maxdef = get("maxdef") ;
$maxsatk = get("maxsatk") ;
$maxsdef = get("maxsdef") ;
$maxspd = get("maxspd") ;
$maxstats = $maxhp || $maxatk || $maxdef || $maxsatk || $maxsdef || $maxspd;

$minhp = get("minhp") ;
$minatk = get("minatk") ;
$mindef = get("mindef") ;
$minsatk = get("minsatk") ;
$minsdef = get("minsdef") ;
$minspd = get("minspd") ;
$minstats = $minhp !== False || $minatk !== False || $mindef !== False || $minsatk !== False || $minsdef !== False || $minspd !== False;

$array = array();
$i = 0;
$select = "
SELECT
    s.id as \"id\",
    s.name as \"name\",
    s.type1 as \"type1\",
    s.type2 as \"type2\",
    s.hp as \"hp\",
    s.atk as \"atk\",
    s.def as \"def\",
    s.satk as \"satk\",
    s.sdef as \"sdef\",
    s.spd as \"spd\"";

$from ="FROM species as s";
if ($ruleset !== False) {
/*
    $from .=",
        (";die(dump(run_query("
            SELECT
                s.id as id
            FROM
                species as s
            INNER JOIN
                banspecies as b
            ON
                b.ruleset=$ruleset AND s.id = b.species")));
        $a=";) as banmons";
    $array[$i++] = "(s.id NOT IN (banmons.id))";*/
    $from = "FROM species as s LEFT OUTER JOIN
         banspecies as b ON
        s.id = b.species AND b.ruleset=$ruleset";
    $array[$i++] = "(b.species IS NULL)";
}
if ($type1) {
    $array[$i++] = "(s.type1='$type1' OR s.type2='$type1')";
}
if ($type2) {
    $array[$i++] = "(s.type1='$type2' OR s.type2='$type2')";
}
if ($ability) {
    $array[$i++] = "(s.ability1=$ability OR s.ability2=$ability OR s.ability3=$ability)";
}
if ($minhp) {
    $array[$i++] = "($minhp <= s.hp)";
}
if ($minatk) {
    $array[$i++] = "($minatk <= s.atk)";
}
if ($mindef) {
    $array[$i++] = "($mindef <= s.def)";
}
if ($minsatk) {
    $array[$i++] = "($minsatk <= s.satk)";
}
if ($minsdef) {
    $array[$i++] = "($minsdef <= s.sdef)";
}
if ($minspd) {
    $array[$i++] = "($minspd <= s.spd)";
}
if ($maxhp) {
    $array[$i++] = "($maxhp >= s.hp)";
}
if ($maxatk) {
    $array[$i++] = "($maxatk >= s.atk)";
}
if ($maxdef) {
    $array[$i++] = "($maxdef >= s.def)";
}
if ($maxsatk) {
    $array[$i++] = "($maxsatk >= s.satk)";
}
if ($maxsdef) {
    $array[$i++] = "($maxsdef >= s.sdef)";
}
if ($maxspd) {
    $array[$i++] = "($maxspd >= s.spd)";
}
if ($i != 0) {
    $where = "WHERE ".implode("AND", $array);
}
else {
    $where = "";
}
$query = "$select $from $where"; 
$json = to_json(run_query($query));

/*
if ($moves) {
    $unjson = json_decode($json);

    foreach ($unjson as $key=>$value){
        require("searchmoves.php?species=".$value->id);
        
        $tempq = json_decode(to_json("
            SELECT id
            FROM species
            WHERE id=
        ");
        
        $value->id);
    }
}*/
echo $json;

?>