<?php

// array for JSON response
$response = array();
 
// include db connect class
require_once __DIR__ . '/db_connect.php';
 
// connecting to db
$db = new DB_CONNECT();
 
// get all products from products table
$result = mysql_query("SELECT *FROM holes") or die(mysql_error());
// check for empty result
if (mysql_num_rows($result) > 0) {
    // looping through all results
    // products node
    $response["holes"] = array();
 
    while ($row = mysql_fetch_array($result)) {
        // temp user array
        $holes = array();
        $holes["pid"] = $row["pid"];
        $holes["lat"] = $row["lat"];
        $holes["lng"] = $row["lng"];
	$holes["pothole"]= $row["pothole"];
        $holes["created_at"] = $row["created_at"];
 
        // push single product into final response array
        array_push($response["holes"], $holes);
    }
    // success
    $response["success"] = 1;
 
    // echoing JSON response
    echo json_encode($response);
} else {
    // no products found
    $response["success"] = 0;
    $response["message"] = "No products found";
 
    // echo no users JSON
    echo json_encode($response);
}
?>
