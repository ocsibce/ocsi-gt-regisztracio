import React from 'react';
import styled from 'styled-components';
import { InitialState } from '../../utils/types';
import { useSelector } from 'react-redux';
import i18n from 'i18next';

const DetailsContainer = styled.div`
    width: 100%;

    margin: 64px 0;

    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;

    @media (max-width: 420px) {
        flex-direction: column;
        justify-content: center;
        margin: 0 0 64px 0;
    }
`;

const DetailsList = styled.ul`
    width: 33%;
    list-style: none;
    margin-top: 64px;

    @media (max-width: 420px) {
        width: 90%;
    }
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

    const details = useSelector((state: InitialState) => state.details);

    const regisztracioMenete = details.regisztracioMenete.map((detail, idx) => {
        return <DetailsListItem key={`menet-${idx}`}>{detail}</DetailsListItem>
    })

    const fontosInformaciok = details.fontosInformaciok.map((detail, idx) => {
        return <DetailsListItem key={`fontos-${idx}`}>{detail}</DetailsListItem>
    })

    return (
        <DetailsContainer>
            <DetailsList>
                <DetailsListHeader>
                    {i18n.t`how_to_register`}
                </DetailsListHeader>
                {regisztracioMenete}
            </DetailsList>
            <DetailsList>
                <DetailsListHeader>
                    {i18n.t`important_information`}
                </DetailsListHeader>
                {fontosInformaciok}
            </DetailsList>
        </DetailsContainer>
    );
}

export default Details;