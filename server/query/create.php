<?php

require_once("getquery.php");


$file = fopen("rumons.txt", "r");

if ($file) {
    $first=true;
    while (($buffer = fgets($file)) !== false) {
        if ($first) {
            $buffer=substr($buffer, 3, strlen($buffer));
            $first = false;
        }
        $buffer = substr($buffer, 0, strlen($buffer)-2);
        run_query("
            UPDATE species SET vgc=0 WHERE name=\"$buffer\";
        ");
        echo "Updated $buffer!<br>";
    }
    if (!feof($file)) {
        echo "Oops!";
    }
    fclose($file);
}

echo "Done!";


?>