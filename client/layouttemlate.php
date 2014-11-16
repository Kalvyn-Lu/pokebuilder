<?php
require("js/handle.php");
require("js/template.php");
require("js/query.php");

//  Define these later
if (!$_SESSION["mons"]) {
    $missingno = json_decode(utf8_encode(file_get_contents("js/species.json")));
    
    $_SESSION["mons"] = array($missingno, $missingno, $missingno, $missingno, $missingno, $missingno);
}

$mons = $_POST["mons"];

$curr = $mons[0];

?>

<!DOCTYPE html >
<html>
    <head>
        <title>
            Pokebuilder
        </title>
		<link rel="stylesheet" href="css/template.css" />
    </head>
    <body>
        <div id="body" class="centered">
            <form id="poke">
                <input type="submit" name="submitex" value="Export Team"/>
                <input type="submit" name="submitin" value="Import Team"/>
                <input type="submit" name="submitrules" value="Ruleset"/>
				<table id="tabs"><tr>
					<td>
                    <?php
                    for ($i = 0; $i < 6; $i++) {
                    echo "<table class=\"mons\"><tr><td rowspan=\"3\" class=\"centered centeredvert\">";
                    if ($mons[$i]["id"] != 0) {
                        echo "<img class=\"tinypic\" src=\"http://www.pkparaiso.com/imagenes/xy/sprites/animados";
                        if ($mons[$i]["shine"]) {
                            echo "-shiny";
                        }
                        echo "/".strtolower(str_replace(" ", "_", $mons[$i]["mon"])).".gif\" alt=\"Pokemon Sprite\"/>";
                    }
                    echo "</td><td>".$mons[$i]["nick"]."</td></tr><tr><td>";
                    if ($mons[$i]["item"] != ("(No Item)") {
                        echo "<img src=\"http://serebii.net/itemdex/sprites/".strtolower(str_replace(" ", "", $mons[$i]["item"]));.".png\"></td></tr></table></td>}";
                    }
                    ?>
				</tr></table>
                <hr>
<table id="poketable" class="maxwidth">
	<tr>
		<td id="image" class="centered centeredvert">
			<img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados
                <?php if ($curr["shine"]) echo "-shiny"; ?>/<?php echo $curr["mon"]; ?>.gif" alt="Pokemon Sprite"/>
		</td>
		<td id="data">
			<h2 class="width100">
				<?php echo $curr["mon"]); ?>
			</h2>
			<table class="verttop">
				<tr>
					<td>
						Name:
					</td>
					<td>
						<input type="text" name="nick" class="width85" value="<?php echo $curr["nick"]; ?>"/>
					</td>
				</tr>
				<tr>
					<td>
						Level:
					</td>
					<td>
						<input type="text" name="level" class="width85" value="<?php echo $curr["level"]; ?>"/>
					</td>
				</tr>
				<tr>
					<td>
						Shiny:
					</td>
					<td>
						<input type="checkbox" name="shine" <?php if ($curr["shiny"]) { echo "checked=\"checked\""; }?>/>
					</td>
				</tr>
				<tr>
					<td>
						Gender:
					</td>
					<td>
						M<input type="radio" name="gender" value="m"
                            <?php if ($curr["gender"] == 'm') { echo "checked=\"checked\""; }?> onchange="change_gender('m')"/>
						F<input type="radio" name="gender" value="f"
                            <?php if ($curr["gender"] == 'f') { echo "checked=\"checked\""; }?> onchange="change_gender('f')"/>
					</td>
				</tr>
				<tr>
					<td>
						Nature:
					</td>
					<td>
						<input type="button" name="nature" class="width85" value="<?php echo $curr["nature"];?>" onclick="change_nature()">
					</td>
				</tr>
			</table>
		</td>
		<td id="set">
			<table>
				<tr>
					<td>
						Ability:
					</td>
					<td>
						<input type="button" name="ability" class="width125" value="<?php echo $curr["ability"];?>" onclick="change_ability()">
					</td>
				</tr>
				<tr>
					<td>
						Item: 
					</td>
					<td>
						<input type="button" name="item" class="width125" value="<?php echo $curr["item"];?>"  onclick="change_item()">
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<p>
							<input name="move0" class="width180" type="button" value="<?php echo $curr["moves"][0];?>" />
						</p>
						<p>
							<input name="move1" class="width180" type="button" value="<?php echo $curr["moves"][1];?>"/>
						</p>
						<p>
							<input name="move2" class="width180" type="button" value="<?php echo $curr["moves"][2];?>"/>
						</p>
						<p>
							<input name="move3" class="width180" type="button" value="<?php echo $curr["moves"][3];?>"/>
						</p>
					</td>
				</tr>
			</table>
		</td>
		<td id="stats">
			<table class="maxwidth">
				<tr>
					<td width="25%">
						IV HP:
					</td>
					<td width="25%">
						<input name="hpiv" type="text" class="width50" value="<? echo $curr["ivs"]["hp"];?>"/>
					</td>
					<td width="25%">
						EV HP:
					</td>
					<td width="25%">
						<input name="hpev" type="text" class="width50" value="<? echo $curr["ivs"]["hp"];?>"/>
					</td>
				</tr>
				<tr>
					<td>
						IV Atk:
					</td>
					<td>
						<input name="atkiv" type="text" class="width50" value="<? echo $curr["ivs"]["atk"];?>"/>
					</td>
					<td>
						EV Atk:
					</td>
					<td>
						<input name="atkev" type="text" class="width50" value="<? echo $curr["ivs"]["atk"];?>"/>
					</td>
				</tr>
				<tr>
					<td>
						IV Def:
					</td>
					<td>
						<input name="defiv" type="text" class="width50" value="<? echo $curr["ivs"]["def"];?>"/>
					</td>
					<td>
						EV Def:
					</td>
					<td>
						<input name="defev" type="text" class="width50" value="<? echo $curr["ivs"]["def"];?>"/>
					</td>
				</tr>
				<tr>
					<td>
						IV SpAtk:
					</td>
					<td>
						<input name="satkiv" type="text" class="width50" value="<? echo $curr["ivs"]["satk"];?>"/>
					</td>
					<td>
						EV SpAtk:
					</td>
					<td>
						<input name="satkev" type="text" class="width50" value="<? echo $curr["ivs"]["satk"];?>"/>
					</td>
				</tr>
				<tr>
					<td>
						IV SpDef:
					</td>
					<td>
						<input name="sdefiv" type="text" class="width50" value="<? echo $curr["ivs"]["sdef"];?>"/>
					</td>
					<td>
						EV SpDef:
					</td>
					<td>
						<input name="sdefev" type="text" class="width50" value="<? echo $curr["ivs"]["sdef"];?>"/>
					</td>
				</tr>
				<tr>
					<td>
						IV Speed:
					</td>
					<td>
						<input name="spdiv" type="text" class="width50" value="<? echo $curr["ivs"]["spd"];?>"/>
					</td>
					<td>
						EV Speed:
					</td>
					<td>
						<input name="spdev" type="text" class="width50" value="<? echo $curr["ivs"]["spd"];?>"/>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
                <hr>
            </form>
<h1 id="queryname">Legal Natures</h1>
<table id="querytable">
	<tr><th>Name</th><th>Boosted Stat</th><th>Dropped Stat</th></tr>
	<tr><td>Hardy</td><td>Attack</td><td>Attack</td></tr>
	<tr><td>Lonely</td><td>Attack</td><td>Defense</td></tr>
	<tr><td>Brave</td><td>Attack</td><td>Speed</td></tr>
	<tr><td>Adamant</td><td>Attack</td><td>Sp. Attack</td></tr>
	<tr><td>Naughty</td><td>Attack</td><td>Sp. Defense</td></tr>
	<tr><td>Bold</td><td>Defense</td><td>Attack</td></tr>
	<tr><td>Docile</td><td>Defense</td><td>Defense</td></tr>
	<tr><td>Relaxed</td><td>Defense</td><td>Speed</td></tr>
	<tr><td>Impish</td><td>Defense</td><td>Sp. Attack</td></tr>
	<tr><td>Lax</td><td>Defense</td><td>Sp. Defense</td></tr>
	<tr><td>Timid</td><td>Speed</td><td>Attack</td></tr>
	<tr><td>Hasty</td><td>Speed</td><td>Defense</td></tr>
	<tr><td>Serious</td><td>Speed</td><td>Speed</td></tr>
	<tr><td>Jolly</td><td>Speed</td><td>Sp. Attack</td></tr>
	<tr><td>Naive</td><td>Speed</td><td>Sp. Defense</td></tr>
	<tr><td>Modest</td><td>Sp. Attack</td><td>Attack</td></tr>
	<tr><td>Mild</td><td>Sp. Attack</td><td>Defense</td></tr>
	<tr><td>Quiet</td><td>Sp. Attack</td><td>Speed</td></tr>
	<tr><td>Bashful</td><td>Sp. Attack</td><td>Sp. Attack</td></tr>
	<tr><td>Rash</td><td>Sp. Attack</td><td>Sp. Defense</td></tr>
	<tr><td>Calm</td><td>Sp. Defense</td><td>Attack</td></tr>
	<tr><td>Gentle</td><td>Sp. Defense</td><td>Defense</td></tr>
	<tr><td>Sassy</td><td>Sp. Defense</td><td>Speed</td></tr>
	<tr><td>Careful</td><td>Sp. Defense</td><td>Sp. Attack</td></tr>
	<tr><td>Quirky</td><td>Sp. Defense</td><td>Sp. Defense</td></tr>
</table>
        </div>
    </body>
<html>