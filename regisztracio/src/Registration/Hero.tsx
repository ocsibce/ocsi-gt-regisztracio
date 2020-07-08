import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
    width: 100%;
    height: 40vh;
    background-color: #F9DC5C;
    color: #FFF;
    position: relative;
`;

const HeroContainer = styled.div`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const MainTitle = styled.h1`
    font-size: 48px;
    margin-bottom: 48px;
`;

const TitleSpan = styled.span`
    display: block;
`;

const Hero : React.FC = props => {
    return (
        <Header>
            <HeroContainer>
                <MainTitle>
                    <TitleSpan>Közgáz Gólyatábor </TitleSpan>
                    <TitleSpan>2020</TitleSpan>
                </MainTitle>
            </HeroContainer>
        </Header>
    );
}

export default Hero;