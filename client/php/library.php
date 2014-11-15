<?php

//  Title of the table
$q_heading = "";

//  The table populated with the query without <table> tags
$q_table = "";

//  Generate the URL for an animated Pokemon which we can shamelessly steal.
function animated_poke_url($poke, $isshiny) {
    $poke = strtolower(str_replace(" ", "_", $poke));
    $make_shiny = $isshiny ? "-shiny" : "";
    return "http://www.pkparaiso.com/imagenes/xy/sprites$makeshiny/animados/$poke.gif";
}


//  Generate the URL for a Serebii item which we can shamelessly steal.
function serebii_item_url($item){
    $item = strtolower(str_replace(" ", "", $item));
    return "http://serebii.net/itemdex/sprites/$item.png";
}

function build_query($relation) {
    
    
    switch ($relation) {
    case "switchmon":
        //  Run an update on the current mon
        //  then fetch the switch-in
        break;
    case "nature":
        $q_heading = "Legal Natures";
        $q_table = $q_natures_table;
        break;
    case "ability":
        //  Fetch the abilities that a species can learn
        break;
    case
    }
}

$q_natures_table = "<tr><th>Name</th><th>Boosted Stat</th><th>Dropped Stat</th></tr><tr><td>Hardy</td><td>Attack</td><td>Attack</td></tr><tr><td>Lonely</td><td>Attack</td><td>Defense</td></tr><tr><td>Brave</td><td>Attack</td><td>Speed</td></tr><tr><td>Adamant</td><td>Attack</td><td>Sp. Attack</td></tr><tr><td>Naughty</td><td>Attack</td><td>Sp. Defense</td></tr><tr><td>Bold</td><td>Defense</td><td>Attack</td></tr><tr><td>Docile</td><td>Defense</td><td>Defense</td></tr><tr><td>Relaxed</td><td>Defense</td><td>Speed</td></tr><tr><td>Impish</td><td>Defense</td><td>Sp. Attack</td></tr><tr><td>Lax</td><td>Defense</td><td>Sp. Defense</td></tr><tr><td>Timid</td><td>Speed</td><td>Attack</td></tr><tr><td>Hasty</td><td>Speed</td><td>Defense</td></tr><tr><td>Serious</td><td>Speed</td><td>Speed</td></tr><tr><td>Jolly</td><td>Speed</td><td>Sp. Attack</td></tr><tr><td>Naive</td><td>Speed</td><td>Sp. Defense</td></tr><tr><td>Modest</td><td>Sp. Attack</td><td>Attack</td></tr><tr><td>Mild</td><td>Sp. Attack</td><td>Defense</td></tr><tr><td>Quiet</td><td>Sp. Attack</td><td>Speed</td></tr><tr><td>Bashful</td><td>Sp. Attack</td><td>Sp. Attack</td></tr><tr><td>Rash</td><td>Sp. Attack</td><td>Sp. Defense</td></tr><tr><td>Calm</td><td>Sp. Defense</td><td>Attack</td></tr><tr><td>Gentle</td><td>Sp. Defense</td><td>Defense</td></tr><tr><td>Sassy</td><td>Sp. Defense</td><td>Speed</td></tr><tr><td>Careful</td><td>Sp. Defense</td><td>Sp. Attack</td></tr><tr><td>Quirky</td><td>Sp. Defense</td><td>Sp. Defense</td></tr>";

?>