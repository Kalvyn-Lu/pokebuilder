<?php

require_once("getquery.php");

$query = "
SELECT
    m.'name' as \"move\",
    m.'power' as \"power\",
    m.'accuracy' as \"accuracy\",
    m.'category' as \"category\",
    m.'pp' as \"pp\",
FROM    
    move as m
";

$result = run_query($query);

?>