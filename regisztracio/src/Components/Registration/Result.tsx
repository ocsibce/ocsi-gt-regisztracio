import React from 'react';

const Result = (props: {sikeres: "sikeres" | "sikertelen" | "dupla" | null}) => {

    const text = () => {
        switch (props.sikeres) {
            case "sikeres":
                return (
                    <>
                        <h1>Gratulálunk</h1>
                        <h2>A regisztráció sikeres volt</h2>
                    </>
                )
            case "sikertelen":
                return (
                    <>
                        <h1>Sajnos nem sikerült regisztrálni</h1>
                        <h2>Próbáld meg kicsit később</h2>
                    </>
                )
            case "dupla":
                return (
                    <>
                        <h1>Sajnos nem sikerült regisztrálni</h1>
                        <h2>Ezekkel az adatokkal már regisztráltak</h2>
                    </>
                )
            case null:
                return (
                    <h1>Ezt nem kéne látnod</h1>
                )
        }
    }

    return (
        <>
            {text()}
        </>
    );
}

export default Result;