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
    include_once '../objects/user.php';

    $database = new Database();
    $db = $database->getConnection();

    $user = new User($db);

    $data = json_decode(file_get_contents("php://input"));

    if (
        !empty($data->username) &&
        !empty($data->password)
    ) {
        $user->username = $data->username;
        $user->password = $data->password;

        $statusCode = $user->create();

        http_response_code($statusCode);

        switch ($statusCode) {
            case 201:
                echo json_encode(
                    array(
                        "message" => "New user registered"
                    )
                );
                break;
            case 403:
                echo json_encode(
                    array(
                        "message" => "Someone already registered with this username"
                    )
                );
                break;
            case 503:
                echo json_encode(
                    array(
                        "message" => "Can't register right now"
                    )
                );
                break;
            default:
                echo json_encode(
                    array(
                        "message" => "Can't register right now"
                    )
                );
                break;
        }
    } else {
        http_response_code(400);

        echo json_encode(
            array("message" => "Data is incomplete.")
        );
    }
?>