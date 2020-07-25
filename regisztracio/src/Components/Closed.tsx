import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Text = styled.h1`
    text-align: center;
    margin-top: 64px;
    font-size: 64px;
`;

const Closed : React.FC = props => {

    const [t] = useTranslation();

    return (
        <>
            <Text>{t`closed`}</Text>
        </>
    );
}

export default Closed;