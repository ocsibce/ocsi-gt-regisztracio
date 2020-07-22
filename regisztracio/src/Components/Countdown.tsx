import React, { useEffect, useState } from 'react';
import { InitialState } from '../utils/types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import i18n from 'i18next';

const EPOCH_TO_SECOND = 1000;
const EPOCH_TO_MINUTES = 60 * EPOCH_TO_SECOND;
const EPOCH_TO_HOURS = 60 * EPOCH_TO_MINUTES;
const EPOCH_TO_DAYS = 24 * EPOCH_TO_HOURS;
const EPOCH_TO_WEEKS = 7 * EPOCH_TO_DAYS;

const CountdownMainText = styled.h1`
    text-align: center;
    margin-top: 128px;
    margin-bottom: 64px;
    font-size: 42px;
`;

const CountdownSpan = styled.span`
    font-size: 56px;
`;

const Countdown : React.FC = props => {

    const startTime = new Date(useSelector((state: InitialState) => state.startTime));
    const [countdownText, setCountdownText] = useState("")


    useEffect(() => {
        const interval = setInterval(() => {
                let remainingTime = startTime.getTime() - Date.now()
                let countdownArray = [];
                if (remainingTime > EPOCH_TO_WEEKS) {
                    const weeks = Math.floor(remainingTime / EPOCH_TO_WEEKS)
                    countdownArray.push(i18n.t(`week`, {count: weeks}));
                    remainingTime -= weeks * EPOCH_TO_WEEKS;
                }
                if (remainingTime > EPOCH_TO_DAYS) {
                    const days = Math.floor(remainingTime / EPOCH_TO_DAYS)
                    countdownArray.push(i18n.t("day", {count: days}))
                    remainingTime -= days * EPOCH_TO_DAYS;
                }
                if (remainingTime > EPOCH_TO_HOURS) {
                    const hours = Math.floor(remainingTime / EPOCH_TO_HOURS);
                    countdownArray.push(i18n.t(`hour`, {count: hours}))
                    remainingTime -= hours * EPOCH_TO_HOURS;
                } else {countdownArray.push(i18n.t(`hour`, {count: 0}))}
                if (remainingTime > EPOCH_TO_MINUTES) {
                    const minutes = Math.floor(remainingTime / EPOCH_TO_MINUTES);
                    countdownArray.push(i18n.t(`minute`, {count: minutes}))
                    remainingTime -= minutes * EPOCH_TO_MINUTES;
                } else {countdownArray.push(i18n.t(`minute`, {count: 0}))}
                if (remainingTime > EPOCH_TO_SECOND) {
                    const seconds = Math.floor(remainingTime / EPOCH_TO_SECOND);
                    countdownArray.push(i18n.t(`second`, {count: seconds}))
                    remainingTime -= seconds * EPOCH_TO_SECOND;
                } else {countdownArray.push(i18n.t(`second`, {count: 0}))}
                setCountdownText(countdownArray.join(' '));
        }, 1000)
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
            <CountdownMainText>
                <CountdownSpan> {countdownText} </CountdownSpan>
                <br /> {i18n.t("countdown_text")}
            </CountdownMainText>
    );
}

export default Countdown;