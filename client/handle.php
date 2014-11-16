<?php

$mons = $_SESSION["mons"];
$curr = $mons[$_SESSION["mon"]];

$curr["nick"] = $_POST["nick"];
$curr["shine"] = $_POST["shine"];
$curr["gender"] = $_POST["gender"];
$curr["nature"] = $_POST["nature"];
$curr["ability"] = $_POST["ability"];
$curr["item"] = $_POST["item"];
$curr["moves"] = array();
$curr["moves"][0] = $_POST["move0"];
$curr["moves"][1] = $_POST["move1"];
$curr["moves"][2] = $_POST["move2"];
$curr["moves"][3] = $_POST["move3"];
$curr["ivs"] = json_decode("
{
\"hp\":".$_POST["hpiv"].",
\"atk\":".$_POST["atkiv"].",
\"def\":".$_POST["defiv"].",
\"satk\":".$_POST["satkiv"].",
\"sdef\":".$_POST["sdefiv"].",
\"spd\":".$_POST["spdiv"]."
}
");
$curr["evs"] = json_decode(utf_encode("
{
\"hp\":".$_POST["hpev"].",
\"atk\":".$_POST["atkev"].",
\"def\":".$_POST["defev"].",
\"satk\":".$_POST["satkev"].",
\"sdef\":".$_POST["sdefev"].",
\"spd\":".$_POST["spdev"]."
}
"));

?>