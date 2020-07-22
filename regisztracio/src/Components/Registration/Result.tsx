import React from 'react';
import { useTranslation } from 'react-i18next';

const Result = (props: {sikeres: "sikeres" | "sikertelen" | "dupla" | null}) => {

    const [t] = useTranslation()

    const text = () => {
        switch (props.sikeres) {
            case "sikeres":
                return (
                    <>
                        <h1> {t`congratulations`} </h1>
                        <h2> {t`success`} </h2>
                    </>
                )
            case "sikertelen":
                return (
                    <>
                        <h1> {t`unfortunately`} </h1>
                        <h2> {t`try_later`} </h2>
                    </>
                )
            case "dupla":
                return (
                    <>
                        <h1> {t`unfortunately`} </h1>
                        <h2> {t`duplicate`} </h2>
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