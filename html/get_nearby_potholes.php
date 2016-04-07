<?php

// array for JSON response
$response = array();
$threshold = 0.5;

// check for required fields
if (isset($_POST['lat']) && isset($_POST['lng']) ){

    $lat = $_POST['lat'];
    $lng = $_POST['lng'];

    // include db connect class
    require_once __DIR__ . '/db_connect.php';

    // connecting to db
    $db = new DB_CONNECT();

    // mysql inserting a new row
    $result = mysql_query("SELECT * FROM  `holes` WHERE ABS(`lat` -$lat ) <$threshold AND ABS(`lng`-$lng)<$threshold");

     if (mysql_num_rows($result) > 0) {
	    // looping through all results
	    // products node
	    $response["holes"] = array();

	    while ($row = mysql_fetch_array($result)) {
		// temp user array
		$holes = array();
		$holes["position"] = array("lat" => floatval( $row["lat"]), "lng" => floatval($row["lng"]));
		//$holes["lat"] = $row["lat"];
		//$holes["lng"] = $row["lng"];
		$holes["pothole"]= $row["pothole"];

		// push single product into final response array
		array_push($response["holes"], $holes);
	    }
	    // success
	    $response["success"] = 1;

	    // echoing JSON response
	    echo json_encode($response);
	} else {
	    // no potholes found
	    $response["success"] = 0;
	    $response["message"] = "No potholes found";

    	// echo no users JSON
   	 echo json_encode($response);
	}
} else {
echo("lat and lng not supplied");
}
?>
