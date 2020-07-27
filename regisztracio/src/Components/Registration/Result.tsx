import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const ResultContainer = styled.div`
    padding-bottom: 64px;
`;

const Result = (props: {sikeres: "sikeres" | "sikertelen" | "dupla" | null}) => {

    const [t] = useTranslation()

    const text = () => {
        switch (props.sikeres) {
            case "sikeres":
                return (
                    <ResultContainer>
                        <h1> {t`congratulations`} </h1>
                        <h2> {t`success`} </h2>
                    </ResultContainer>
                )
            case "sikertelen":
                return (
                    <ResultContainer>
                        <h1> {t`unfortunately`} </h1>
                        <h2> {t`try_later`} </h2>
                    </ResultContainer>
                )
            case "dupla":
                return (
                    <ResultContainer>
                        <h1> {t`unfortunately`} </h1>
                        <h2> {t`duplicate`} </h2>
                    </ResultContainer>
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