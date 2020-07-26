<?php
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

    if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);

        echo json_encode(
            array("message" => "ok")
        );
        return;
    }

    include_once '../config/database.php';
    include_once '../objects/golya.php';

    include_once '../objects/user.php';
    $authToken = User::getAuthToken();
    if (!User::validateToken($authToken)) {
        http_response_code(400);
        echo json_encode(
            array(
                "message" => 'Unauthorized'
            )
        );
        die();
    }

    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    $golya = new Golya($db);

    $data = json_decode(file_get_contents("php://input"));

    $golya->id = $data->id;

    if($golya->delete()){
        http_response_code(200);

        echo json_encode(array("message" => "Golya was deleted."));
    }

    else{
        http_response_code(503);

        echo json_encode(array("message" => "Unable to delete golya."));
    }
?>