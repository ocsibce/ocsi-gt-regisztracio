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

    // get database connection
    include_once '../config/database.php';

    // instantiate product object
    include_once '../objects/golya.php';

    $database = new Database();
    $db = $database->getConnection();

    $golya = new Golya($db);

    // get posted data
    $data = json_decode(file_get_contents("php://input"));

    if (
        !empty($data->nev) &&
        !empty($data->email) &&
        !empty($data->szak) &&
        !empty($data->telefonszam) &&
        !empty($data->cim) &&
        !empty($data->szuletesiDatum) &&
        !empty($data->szuletesiHely) &&
        !empty($data->poloMeret) &&
        !empty($data->anyjaNeve)
    ) {
        $golya->nev = $data->nev;
        $golya->email = $data->email;
        $golya->szak = $data->szak;
        $golya->telefonszam = $data->telefonszam;
        $golya->cim = $data->cim;
        $golya->nem = $data->nem;
        $golya->oktatasiAzonosito = $data->oktatasiAzonosito;
        $golya->szuletesiDatum = $data->szuletesiDatum;
        $golya->szuletesiHely = $data->szuletesiHely;
        $golya->poloMeret = $data->poloMeret;
        $golya->hetfo = $data->hetfo;
        $golya->kedd = $data->kedd;
        $golya->szerda = $data->szerda;
        $golya->csutortok = $data->csutortok;
        $golya->pentek = $data->pentek;
        $golya->anyjaNeve = $data->anyjaNeve;
        $golya->allergia = $data->allergia;
        $golya->etelerzekenyseg = $data->etelerzekenyseg;
        $golya->egyeb = $data->egyeb;
        $golya->regisztracioDatuma = date('Y-m-d H:i:s');

        $createStatusCode = $golya->create();

        if($createStatusCode == 201) {
            http_response_code(201);

            echo json_encode(
                array(
                    "message" => "New golya was added to the database"
                )
                );
        } else {
            if ($createStatusCode == 403) {
                http_response_code(403);

                echo json_encode(
                    array(
                        "message" => "Duplicate entry"
                    )
                );
            } else {
                http_response_code(503);

                echo json_encode(
                    array(
                        "message" => "Unable to create new golya"
                    )
                );
            }
        }
    } else {
        http_response_code(400);

        echo json_encode(
            array("message" => "Unable to create new golya! Data is incomplete.")
        );
    }

?>