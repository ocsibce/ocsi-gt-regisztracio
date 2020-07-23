import React from 'react';
import styled from 'styled-components';
import Cover from '../facebook_cover.png';

const Header = styled.header`
    width: 100%;
    height: 40vh;
    background-color: #F9DC5C;
    color: #FFF;
    position: relative;
    text-align: center;
`;

const BigHeader = styled(Header)`
    height: 60vh
`

const HeroImg = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

// TODO: text in mobile view

const Hero = (props: {heroStyle: "small" | "big"}) => {

    return props.heroStyle === "big" ?
        <BigHeader> <HeroImg src={Cover} /> </BigHeader> :
        <Header> <HeroImg src={Cover} /> </Header>

}

export default Hero;