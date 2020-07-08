import React, { useState } from 'react';
import styled from 'styled-components';

const DetailsContainer = styled.div`
    width: 100%;

    margin: 64px 0;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const DetailsList = styled.ul`
    width: 33%;
    list-style: none;
`;

const DetailsListHeader = styled.li`
    color: #36454f;
    font-size: 26px;
    margin-bottom: 24px;
    font-weight: bold;
`;

const DetailsListItem = styled.li`
    color: #233745;
    padding-bottom: 8px;
    margin-bottom: 4px;
    border-bottom: 2px #36454f solid;
`;


const Details : React.FC = props => {

    const [details, setDetails] = useState({
        "regisztracioMenete": [
            "Regisztrálj a lenti űrlapon",
            "Egy pár nap múlva küldünk egy e-mailt",
            "Fizesd be a tábor árát, az e-mailben kapott információk alapján",
            "Hozd el magaddal a bizonylatot az utalásról a táborba",
            "Gyere el és érezd jól magad"
        ],
        "fontosInformaciok": [
            "A tábor ára 29.000 Forint",
            "Az esemény kizárólag a Budapesti Corvinus Egyetem 2019. szeptemberében felvett NAPPALI munkarendű ALAPSZAKOS hallgatói számára van meghírdetve"
        ]
    });

    const regisztracioMenete = details.regisztracioMenete.map(detail => {
        return <DetailsListItem>{detail}</DetailsListItem>
    })

    const fontosInformaciok = details.fontosInformaciok.map(detail => {
        return <DetailsListItem>{detail}</DetailsListItem>
    })

    return (
        <DetailsContainer>
            <DetailsList>
                <DetailsListHeader>
                    Regisztráció menete
                </DetailsListHeader>
                {regisztracioMenete}
            </DetailsList>
            <DetailsList>
                <DetailsListHeader>
                    Fontos információk
                </DetailsListHeader>
                {fontosInformaciok}
            </DetailsList>
        </DetailsContainer>
    );
}

export default Details;