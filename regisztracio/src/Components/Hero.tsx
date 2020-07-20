import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
    width: 100%;
    height: 20vh;
    background-color: #F9DC5C;
    color: #FFF;
    position: relative;
    text-align: center;
`;

const BigHeader = styled(Header)`
    height: 40vh
`

const HeroContainer = styled.div`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const MainTitle = styled.h1`
    font-size: 32px;
    margin-bottom: 24px;
`;

const BigTitle = styled(MainTitle)`
    margin-bottom: 48px;
`;

const TitleSpan = styled.span`
    display: block;
`;

const Hero = (props: {heroStyle: "small" | "big"}) => {

    const heroText = <>
        <TitleSpan>Közgáz Gólyatábor </TitleSpan>
        <TitleSpan>2020</TitleSpan>
    </>

    const heroTitle = props.heroStyle === "big" ? <BigTitle> {heroText} </BigTitle> : <MainTitle> {heroText} </MainTitle>;

    const heroHeader = props.heroStyle === "big" ?
        <BigHeader> <HeroContainer> {heroTitle} </HeroContainer> </BigHeader> :
        <Header> <HeroContainer> {heroTitle} </HeroContainer> </Header>


    return heroHeader;
}

export default Hero;