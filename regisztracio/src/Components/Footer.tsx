import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    flex-shrink: 0;
    text-align: center;
    color: #666;
    padding: 16px;
    background-color: #F9DC5C;
`;

const Footer : React.FC = props => {
    const startYearText = 2020;

    const currentYear = new Date(Date.now()).getFullYear();

    let yearText = `${startYearText}`;

    if (currentYear > startYearText) {
        yearText += `-${currentYear}`
    }

    return (
    <FooterContainer>
        <h3>
            Öntevékeny Csoportok Irodája &copy; {yearText}
        </h3>
        <h5>
            Csörnyei Máté
        </h5>
    </FooterContainer>);
}

export default Footer;