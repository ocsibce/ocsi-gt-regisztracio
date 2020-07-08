import React from 'react';
import styled from 'styled-components';
import Hero from './Hero';
import Details from './Details';
import Form from './Form';
import Result from './Result';

const Main = styled.div`
    background-color: yellow;
`;

const Registration : React.FC = props => {
    return (
        <Main>
            <Hero />
            <main>
                <h1>Regisztráció</h1>
                <Details />
                <Form />
                <Result />
            </main>
        </Main>
    );
}

export default Registration;