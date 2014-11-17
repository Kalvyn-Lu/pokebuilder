<?php

require_once("getquery.php");


$type1 = get("type1") ;
$type2 = get("type2") ;
/*
$move0 = get("move0") ;
$move1 = get("move1") ;
$move2 = get("move2") ;
$move3 = get("move3") ;
$moves = $move0 or $move1 or $move2 or $move3;*/

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
$minstats = $minhp || $minatk || $mindef || $minsatk || $minsdef || $minspd;

$query = "
SELECT
    s.name as \"name\",
    s.type1 as \"type1\",
    s.type2 as \"type2\"
";
if ($maxstats || $minstats) {
    $query.="
    ,s.hp as \"hp\",
    s.atk as \"atk\",
    s.def as \"def\",
    s.satk as \"satk\",
    s.sdef as \"sdef\",
    s.spd as \"spd\"
    ";
}
$query.="FROM species as s ";
/*if ($moves) {
    $query.=", moves as m";
}*/

$array = array();;
$i = 0;
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
    $query .= "WHERE ".implode("AND", $array);
}
$result = run_query($query);

echo $json = to_json($result);

?>