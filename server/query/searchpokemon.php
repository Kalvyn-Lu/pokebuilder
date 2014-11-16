<?php

require_once("getquery.php");

$type1 = $_GET["type1"] or FALSE;
$type2 = $_GET["type2"] or FALSE;

$move0 = $_GET["move0"] or FALSE;
$move1 = $_GET["move1"] or FALSE;
$move2 = $_GET["move2"] or FALSE;
$move3 = $_GET["move3"] or FALSE;
$moves = $move0 or $move1 or $move2 or $move3;

$ability = $_GET["ability"] or FALSE;

$maxhp = $_GET["maxhp"] or FALSE;
$maxatk = $_GET["maxatk"] or FALSE;
$maxdef = $_GET["maxdef"] or FALSE;
$maxsatk = $_GET["maxsatk"] or FALSE;
$maxsdef = $_GET["maxsdef"] or FALSE;
$maxspd = $_GET["maxspd"] or FALSE;
$maxstats = $maxhp || $maxatk || $maxdef || $maxsatk || $maxsdef || $maxspd;

$minhp = $_GET["minhp"] or FALSE;
$minatk = $_GET["minatk"] or FALSE;
$mindef = $_GET["mindef"] or FALSE;
$minsatk = $_GET["minsatk"] or FALSE;
$minsdef = $_GET["minsdef"] or FALSE;
$minspd = $_GET["minspd"] or FALSE;
$minstats = $minhp || $minatk || $mindef || $minsatk || $minsdef || $minspd;

$query = "
SELECT
    s.'name' as \"species\",
    s.'type1' as \"type1\",
    s.'type2' as \"type2\"
";
if ($maxstats || $minstats) {
    $query.="
    ,s.'hp' as \"hp\",
    s.'atk' as \"atk\",
    s.'def' as \"def\",
    s.'satk' as \"satk\",
    s.'sdef' as \"sdef\",
    s.'spd' as \"spd\"
    ";
}
$query.="FROM species as s";
if ($moves) {
    $query.=", moves as m";
}

$query.="WHERE 1=1";
if ($type1) {
    $query.="AND (s.'type1'='$type1' OR s.'type2'='$type1')";
}
if ($type2) {
    $query.="AND (s.'type1'='$type2' OR s.'type2'='$type2')";
}
if ($ability) {
    $query.="AND (s.'ability1'='$ability OR s.'ability2'='$ability' OR s.'ability3'='$ability')";
}
if ($minhp) {
    $query.="AND ($minhp <= s.'hp')";
}
if ($minatk) {
    $query.="AND ($minatk <= s.'atk')";
}
if ($mindef) {
    $query.="AND ($mindef <= s.'def')";
}
if ($minsatk) {
    $query.="AND ($minsatk <= s.'satk')";
}
if ($minsdef) {
    $query.="AND ($minsdef <= s.'sdef')";
}
if ($minspd) {
    $query.="AND ($minspd <= s.'spd')";
}
if ($maxhp) {
    $query.="AND ($maxhp >= s.'hp')";
}
if ($maxatk) {
    $query.="AND ($maxatk >= s.'atk')";
}
if ($maxdef) {
    $query.="AND ($maxdef >= s.'def')";
}
if ($maxsatk) {
    $query.="AND ($maxsatk >= s.'satk')";
}
if ($maxsdef) {
    $query.="AND ($maxsdef >= s.'sdef')";
}
if ($maxspd) {
    $query.="AND ($maxspd >= s.'spd')";
}

$result = run_query($query);

?>