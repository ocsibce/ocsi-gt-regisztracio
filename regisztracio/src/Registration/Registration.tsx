import React, {useState} from 'react';
import styled from 'styled-components';
import Hero from './Hero';
import Details from './Details';
import Form from './Form';
import Result from './Result';

const Main = styled.div`
    margin: 0 5%;
    background-color: #FAE37D;
    text-align: center;
`;

const Registration : React.FC = props => {

    const [result, setResult] = useState(null);

    return (
        <Main>
            <Hero />
            <main>
                <Details />
                <Form />
                {!!result ? <Result sikeres={result}/> : <></> }
            </main>
        </Main>
    );
}

export default Registration;