<?php
 
// array for JSON response
$response = array();
 
// check for required fields
if (isset($_POST['lat']) && isset($_POST['lng']) && isset($_POST['pothole'])) {
 
    $lat = $_POST['lat'];
    $lng = $_POST['lng'];
    $pothole = $_POST['pothole'];
 
    // include db connect class
    require_once __DIR__ . '/db_connect.php';
 
    // connecting to db
    $db = new DB_CONNECT();
 
    // mysql inserting a new row
    $result = mysql_query("INSERT INTO holes(lat, lng, pothole) VALUES('$lat', '$lng', '$pothole')");
 
    // check if row inserted or not
    if ($result) {
        // successfully inserted into database
        $response["success"] = 1;
        $response["message"] = "Pothole succesfully inseted.";
 
        // echoing JSON response
        echo json_encode($response);
    } else {
        // failed to insert row
        $response["success"] = 0;
        $response["message"] = "Oops! An error occurred.";
 
        // echoing JSON response
        echo json_encode($response);
    }
} else {
    // required field is missing
    $response["success"] = 0;
    $response["message"] = "Required field(s) is missing";
 
    // echoing JSON response
    echo json_encode($response);
}
?>
