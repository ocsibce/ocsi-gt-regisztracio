<?php
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");

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

    include_once "../config/database.php";
    include_once "../objects/regisztracio_settings.php";

    $database = new Database();
    $db = $database->getConnection();

    $settings = new RegisztracioSettings($db);

    $data = json_decode(file_get_contents("php://input"));

    if(empty($data->id)) {
        die();
    }

    $settings->id = $data->id;

    $settings->ev = $data->ev;
    $settings->nev = $data->nev;
    $settings->start_date = $data->start_date;
    $settings->end_date = $data->end_date;
    $settings->reszletek = $data->reszletek;
    $settings->reszletek_en = $data->reszletek_en;
    $settings->szakok = $data->szakok;
    $settings->szakok_en = $data->szakok_en;
    $settings->adatkezeles = $data->adatkezeles;
    $settings->adatkezeles_en = $data->adatkezeles_en;
    $settings->hazirend = $data->hazirend;
    $settings->hazirend_en = $data->hazirend_en;
    $settings->banner_link = $data->banner_link;
    $settings->eles = $data->eles;
    $settings->preview = $data->preview;

    if($settings->update()) {
        http_response_code(200);

        echo json_encode(array("message" => "Settings were updated"));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update settings"));
    }
?>
