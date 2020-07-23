import React from 'react';
import styled from 'styled-components';
import Hungarian from '../hungarian.svg';
import English from '../english.png';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { InitialState } from '../utils/types';
import { changeLanguage } from '../State/actions';

const LanguageContainer = styled.div`
    position: absolute;
    top: 50px;
    right: 10px;
    z-index: 5;
`;

const FlagImage = styled.img`
    height: 35px;
    width: 70px;
    cursor: pointer;
`;

const LanguageChanger : React.FC = props => {

    const language = useSelector((state: InitialState) => state.language);
    const dispatch = useDispatch();
    const { i18n } = useTranslation();

    const flagClicked = (lang: "hu" | "en") => {
        dispatch(changeLanguage(lang));
        i18n.changeLanguage(lang);
    }

    return (
        <LanguageContainer>
            {language !== "hu" ?
                <FlagImage src={Hungarian} onClick={() => {flagClicked("hu")}} alt="magyar" /> :
                <FlagImage src={English} onClick={() => {flagClicked("en")}} alt="english" />
            }
        </LanguageContainer>
    );
}

export default LanguageChanger;