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

    include_once "../config/database.php";
    include_once "../objects/regisztracio_settings.php";
    include_once '../objects/user.php';

    $database = new Database();
    $db = $database->getConnection();

    $settings = new RegisztracioSettings($db);

    if (isset($_GET['eles'])) {
        $settings->readEles();
    } else if (isset($_GET['preview'])) {
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
        $settings->readPreview();
    } else {
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
        $settings->id = isset($_GET['id']) ? $_GET['id'] : die();
        $settings->readOne();
    }

    if($settings->ev != null) {
        $setting_item = array(
            'id' => $settings->id,
            'ev' => $settings->ev,
            'nev' => $settings->nev,
            'start_date' => $settings->start_date,
            'end_date' => $settings->end_date,
            'reszletek' => $settings->reszletek,
            'reszletek_en' => $settings->reszletek_en,
            'szakok' => $settings->szakok,
            'szakok_en' => $settings->szakok_en,
            'adatkezeles' => $settings->adatkezeles,
            'adatkezeles_en' => $settings->adatkezeles_en,
            'hazirend' => $settings->hazirend,
            'hazirend_en' => $settings->hazirend_en,
            'banner_link' => $settings->banner_link,
            'eles' => $settings->eles,
            'preview' => $settings->preview,
            'created_at' => $settings->created_at,
            'updated' => $settings->updated,
        );

        http_response_code(200);
        echo json_encode($setting_item);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Not found"));
    }
?>