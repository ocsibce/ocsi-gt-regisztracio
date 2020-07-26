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

    $database = new Database();
    $db = $database->getConnection();

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

    $settings = new RegisztracioSettings($db);

    $stmt = $settings->read();
    $num = $stmt->rowCount();

    if ($num > 0) {
        $settings_arr = array();
        $settings_arr["records"] = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $setting_item = array(
                'id' => $id,
                'ev' => $ev,
                'nev' => $nev,
                'eles' => $eles,
                'preview' => $preview,
                'created_at' => $created_at,
                'updated' => $updated,
            );

            array_push($settings_arr["records"], $setting_item);
        }

        http_response_code(200);

        echo json_encode($settings_arr);
    }
    else {
        http_response_code(404);
        echo json_encode(
            array("message" => "Nincs itt semmi")
        );
    }
?>