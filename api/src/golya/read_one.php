<?php
    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Credentials: true");
    header('Content-Type: application/json');

    // include database and object files
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

    // set ID property of record to read
    $golya->id = isset($_GET['id']) ? $_GET['id'] : die();

    // read the details of product to be edited
    $golya->readOne();

    if($golya->nev!=null){
        // create array
        $golya_item=array(
            "id" => $golya->id,
            "nev" => $golya->nev,
            "email" => $golya->email,
            "szak" => $golya->szak,
            "telefonszam" => $golya->telefonszam,
            "cim" => $golya->cim,
            "nem" => $golya->nem,
            "oktatasiAzonosito" => $golya->oktatasiAzonosito,
            "szuletesiDatum" => $golya->szuletesiDatum,
            "szuletesiHely" => $golya->szuletesiHely,
            "poloMeret" => $golya->poloMeret,
            "hetfo" => $golya->hetfo,
            "kedd" => $golya->kedd,
            "szerda" => $golya->szerda,
            "csutortok" => $golya->csutortok,
            "pentek" => $golya->pentek,
            "anyjaNeve" => $golya->anyjaNeve,
            "allergia" => $golya->allergia,
            "etelerzekenyseg" => $golya->etelerzekenyseg,
            "egyeb" => $golya->egyeb,
            "regisztracioDatuma" => $golya->regisztracioDatuma,
        );

        // set response code - 200 OK
        http_response_code(200);

        // make it json format
        echo json_encode($golya_item);
    }

    else{
        // set response code - 404 Not found
        http_response_code(404);

        // tell the user product does not exist
        echo json_encode(array("message" => "Golya does not exist."));
    }
?>