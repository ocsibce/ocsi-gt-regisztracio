import React from 'react';
import i18n from 'i18next';

const Result = (props: {sikeres: "sikeres" | "sikertelen" | "dupla" | null}) => {

    const text = () => {
        switch (props.sikeres) {
            case "sikeres":
                return (
                    <>
                        <h1> {i18n.t`congratulations`} </h1>
                        <h2> {i18n.t`success`} </h2>
                    </>
                )
            case "sikertelen":
                return (
                    <>
                        <h1> {i18n.t`unfortunately`} </h1>
                        <h2> {i18n.t`try_later`} </h2>
                    </>
                )
            case "dupla":
                return (
                    <>
                        <h1> {i18n.t`unfortunately`} </h1>
                        <h2> {i18n.t`duplicate`} </h2>
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