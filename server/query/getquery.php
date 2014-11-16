<?php

function run_query($query) {
    $conn = new mysqli("localhost", "beckman", "letmein", "tsm");

    if ($conn->connect_error) {
        die("Connection failed: ".$conn->connect_error);
    }

    $results = $conn->query($query);
    if (!$results) {
        die($conn->error);
    }
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

function to_json($result) {
    if ($result->num_rows > 0) {
        $obj = array();
        $i = 0;
        while ($row = $result->fetch_assoc()) {
            $rowdata = array();
            foreach ($row as $key=>$val) {
                $rowdata[$key]=str_replace("\r", "", $val);
            }
            $obj[$i] = $rowdata;
            $i++;
        }
        return json_encode($obj);
    }
}


?>