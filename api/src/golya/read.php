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

    $database = new Database();
    $db = $database->getConnection();

    $golya = new Golya($db);

    // query objects
    $stmt = $golya->read();
    $num = $stmt->rowCount();

    if ($num > 0) {
        $golya_arr = array();
        $golya_arr["records"] = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $golya_item=array(
                "id" => $id,
                "nev" => $nev,
                "email" => $email,
                "szak" => $szak,
                "telefonszam" => $telefonszam,
                "cim" => $cim,
                "nem" => $nem,
                "oktatasiAzonosito" => $oktatasiAzonosito,
                "szuletesiDatum" => $szuletesiDatum,
                "szuletesiHely" => $szuletesiHely,
                "poloMeret" => $poloMeret,
                "hetfo" => $hetfo,
                "kedd" => $kedd,
                "szerda" => $szerda,
                "csutortok" => $csutortok,
                "pentek" => $pentek,
                "anyjaNeve" => $anyjaNeve,
                "allergia" => $allergia,
                "etelerzekenyseg" => $etelerzekenyseg,
                "egyeb" => $egyeb,
                "regisztracioDatuma" => $regisztracioDatuma,
            );

            array_push($golya_arr["records"], $golya_item);
        }

        http_response_code(200);

        echo json_encode($golya_arr);
    } else {
        http_response_code(404);
        echo json_encode(
            array("message" => "Nincsenek golyak")
        );
    }

?>