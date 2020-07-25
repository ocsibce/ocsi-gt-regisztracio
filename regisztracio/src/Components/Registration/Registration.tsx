import React from 'react';
import styled from 'styled-components';
import Details from './Details';
import Form from './Form';
import Result from './Result';
import { useSelector } from 'react-redux';
import { InitialState, Szak } from '../../utils/types';
import { useTranslation } from 'react-i18next';

const Main = styled.div`
    margin: 0 5%;
    background-color: #FAE37D;
    text-align: center;

    @media (max-width: 769px) {
        margin: 0;
    }
`;

const FullCoursesHeading = styled.h2`
    color: red;
`;


const Registration : React.FC = props => {

    const {result, szakok, szakokEn, language} = useSelector((state: InitialState) => state);
    const [t] = useTranslation();

    const getFullSzak = (szakArr: Szak[]) => {
        return szakArr.filter((szak) => szak.betelt).map(szak => szak.name);
    }

    const fullSzakok = getFullSzak(language === 'hu' ? szakok! : szakokEn!);

    let mainPart;

    if (!!result) {
        mainPart = <Result sikeres={result}/>
    } else {
        mainPart = <Form />
    }

    return (
        <Main>
                <Details />
                <h1>{t`registration`}</h1>
                {fullSzakok.length > 0 ? <>
                    <FullCoursesHeading>{t`full_courses_heading`}</FullCoursesHeading>
                    <FullCoursesHeading> {fullSzakok.join(', ')} </FullCoursesHeading>
                </>
                : null}
                {mainPart}
        </Main>
    );
}

export default Registration;