<?php

function run_query($query) {
    $conn = new mysqli("localhost", "beckman", "letmein", "tsm");

    if ($conn->connect_error) {
        die("Connection failed: ".$conn->connect_error);
    }

    $results = $conn->query($query);
    $conn->close();
    return $results;
}

function dump($result) {
    if ($result->num_rows > 0) {
        $table = "<table>";
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $table .= "<tr>";
            foreach ($row as $key=>$val) {
                $table .= "<td>" . $row[$key] . "</td>";
            }
            $table .= "</tr>";
        }
        return $table;
    }
    return "0 results";
}

?>