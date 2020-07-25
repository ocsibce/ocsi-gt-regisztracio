<?php
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");

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

    // include database and object file
    include_once '../config/database.php';
    include_once '../objects/regisztracio_settings.php';

    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    $settings = new RegisztracioSettings($db);

    if (!isset($_GET['id'])) {
        die();
    }

    $settings->id = $_GET['id'];

    if($settings->delete()){
        http_response_code(200);

        echo json_encode(array("message" => "Settings were deleted."));
    }

    else{
        http_response_code(503);

        echo json_encode(array("message" => "Unable to delete settings."));
    }
?>