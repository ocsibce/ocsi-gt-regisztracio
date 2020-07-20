import React, { useEffect, useState } from 'react';
import { InitialState } from '../utils/types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

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

const numberFormatter = (n: number): string => {
    if (n < 10) {
        return `0${n}`;
    }
    return `${n}`;
}

const Countdown : React.FC = props => {

    const startTime = useSelector((state: InitialState) => state.startTime);
    const [countdownText, setCountdownText] = useState("")


    useEffect(() => {
        const interval = setInterval(() => {
            let remainingTime = startTime.getTime() - Date.now()
            let countdownArray = [];
            if (remainingTime > EPOCH_TO_WEEKS) {
                const weeks = Math.floor(remainingTime / EPOCH_TO_WEEKS)
                countdownArray.push(`${weeks} hét`)
                remainingTime -= weeks * EPOCH_TO_WEEKS;
            }

            if (remainingTime > EPOCH_TO_DAYS) {
                const days = Math.floor(remainingTime / EPOCH_TO_DAYS)
                countdownArray.push(`${days} nap`)
                remainingTime -= days * EPOCH_TO_DAYS;
            }

            if (remainingTime > EPOCH_TO_HOURS) {
                const hours = Math.floor(remainingTime / EPOCH_TO_HOURS);
                countdownArray.push(`${numberFormatter(hours)} óra`)
                remainingTime -= hours * EPOCH_TO_HOURS;
            } else {countdownArray.push(`00 óra`)}

            if (remainingTime > EPOCH_TO_MINUTES) {
                const minutes = Math.floor(remainingTime / EPOCH_TO_MINUTES);
                countdownArray.push(`${numberFormatter(minutes)} perc`)
                remainingTime -= minutes * EPOCH_TO_MINUTES;
            } else {countdownArray.push(`00 perc`)}

            if (remainingTime > EPOCH_TO_SECOND) {
                const seconds = Math.floor(remainingTime / EPOCH_TO_SECOND);
                countdownArray.push(`${numberFormatter(seconds)} másodperc`)
                remainingTime -= seconds * EPOCH_TO_SECOND;
            } else {countdownArray.push(`00 másodperc`)}

            setCountdownText(countdownArray.join(' '));
        }, 1000)
        return () => {
            clearInterval(interval);
        };
    }, []);



    return (
            <CountdownMainText>
                A regisztráció kezdetéig még <br /> <CountdownSpan> {countdownText} </CountdownSpan><br /> van hátra
            </CountdownMainText>
    );
}

export default Countdown;