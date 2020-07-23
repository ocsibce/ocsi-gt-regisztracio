import React from 'react';
import styled from 'styled-components';

const Text = styled.h1`
    text-align: center;
    margin-top: 64px;
    font-size: 64px;
`;

const Closed : React.FC = props => {
    return (
        <>
            <Text>A regisztrációt lezártuk</Text>
        </>
    );
}

export default Closed;