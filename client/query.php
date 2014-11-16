<?php
$table = "<table id=\"querytable\"></table>";

function add_header($headings) {
    $table .= "<tr>";
    for ($i = 0; $i < len($headings); $i++) {
        $table += "<th>".$headings[$i]."</th>";
    }
    $table .= "</tr>";
}
function add_row($hook, $attributes) {
    $table .= "<tr><td><input type=\"button\" value=\"$hook\" onclick=\"pick($hook)\"></td>";
    for ($i = 0; $i < len($attributes); $i++) {
        $table += "<td>".$attributes[$i]."</td>";
    }
    $table .= "</tr>";
}

//  Make a query

//  Save the results

//  Handle the query



echo $table;

?>