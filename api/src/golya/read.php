<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    echo "Read";
    include_once '../config/database.php';
    include_once '../objects/golya.php';

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