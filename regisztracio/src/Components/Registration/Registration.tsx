import React from 'react';
import styled from 'styled-components';
import Details from './Details';
import Form from './Form';
import Result from './Result';
import { useSelector } from 'react-redux';
import { InitialState } from '../../utils/types';
import i18n from 'i18next';

const Main = styled.div`
    margin: 0 5%;
    background-color: #FAE37D;
    text-align: center;

    @media (max-width: 769px) {
        margin: 0;
    }
`;

const Registration : React.FC = props => {

    const result = useSelector((state: InitialState) => state.result);

    let mainPart;

    if (!!result) {
        mainPart = <Result sikeres={result}/>
    } else {
        mainPart = <Form />
    }

    return (
        <Main>
                <Details />
                <h1>{i18n.t`registration`}</h1>
                {mainPart}
        </Main>
    );
}

export default Registration;