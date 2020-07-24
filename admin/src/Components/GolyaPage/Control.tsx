import React from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { InitialState, GolyaAdat } from '../../utils/types';
import { formatDate } from '../../utils/utils';



const Controls = () => {

    const filteredGolyaLista = useSelector((state: InitialState) => state.filteredGolyaLista);

    const createCSV = () => {
        const getGolyaArray = (golya: GolyaAdat) => {

            const hetfo = golya.hetfo ? "igen" : "nem";
            const kedd = golya.kedd ? "igen" : "nem";
            const szerda = golya.szerda ? "igen" : "nem";
            const csutortok = golya.csutortok ? "igen" : "nem";
            const pentek = golya.pentek ? "igen" : "nem";
            const allergia = !!golya.allergia ? golya.allergia : "nincs";
            const etelerzekenyseg = !!golya.etelerzekeny ? golya.etelerzekeny : "nincs";
            const egyeb = !!golya.egyeb ? golya.egyeb : "nincs";

            return [`${golya.id}`, golya.nev, golya.email, golya.szak,
                `'${golya.telefonszam}`, golya.cim, golya.nem, `${golya.oktatasiAzonosito}`,
                golya.szuletesiDatum, golya.szuletesiHely,  golya.poloMeret, hetfo,
                kedd, szerda, csutortok, pentek, golya.anyjaNeve, allergia,
                etelerzekenyseg, egyeb, formatDate(golya.regisztracioDatuma, "long-csv")
            ]
        }
        const rows = [
            ["id", "név", "email", "szak", "telefonszám", "cím", "nem",
                "oktatási azonosító", "születési dátum", "születési hely",
                "póló méret", "hétfő", "kedd", "szerda", "csütörtök",
                "péntek", "anyja neve", "allergia", "ételérzékenység",
                "egyéb", "regisztráció dátuma"]
        ];

        filteredGolyaLista.forEach(golya => {
            rows.push(getGolyaArray(golya))
        });

        const csvContent = "data:text/csv;charset=utf-8,\uFEFF"
            + rows.map(row => row.join(";")).join("\n");

        const encodedUri = encodeURI(csvContent);

        const hiddenElement = document.createElement('a');
        hiddenElement.href = encodedUri;
        hiddenElement.target = '_blank';
        hiddenElement.download = 'golyak.csv';
        hiddenElement.click();
    }

    const deleteDatabaseContent = () => {
        console.log("API required...")
    }

    return (
        <>
            <Button variant="success" size="sm" block onClick={createCSV}>CSV Letöltése</Button>
            <Button variant="danger" size="sm" block onClick={deleteDatabaseContent}>Adatbázis kiürítése</Button>
        </>
    );
}

export default Controls;