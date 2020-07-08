import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { timeChanged } from './actions';
import { Time, InitialState } from './utils/types';

const TopBar = styled.div`
    background-color: black;
    color: white;
    font-size: 12px;
    padding: 12px 6px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: baseline;
`;

const PreviewBar : React.FC = props => {

    const dispatch = useDispatch();
    const selectedTime = useSelector((state: InitialState) => {return state.time});

    const changeTime = (time: Time) => {
        dispatch(timeChanged(time))
    }

    return (
        <TopBar>
            <div>
                Preview Mode On
            </div>
            <div>
                <input
                    type="radio"
                    name="time"
                    id="before"
                    onChange={() => {
                        changeTime("before");
                    }}
                    checked={selectedTime === "before"}
                />
                <label htmlFor="before">Regisztráció előtt</label>
            </div>
            <div>
                <input
                    type="radio"
                    name="time"
                    id="during"
                    onChange={() => {
                        changeTime("during");
                    }}
                    checked={selectedTime === "during"}
                />
                <label htmlFor="during">Regisztráció közben</label>
            </div>
            <div>
                <input
                    type="radio"
                    name="time"
                    id="after"
                    onChange={() => {
                        changeTime("after");
                    }}
                    checked={selectedTime === "after"}
                />
                <label htmlFor="after">Regisztráció után</label>
            </div>
        </TopBar>
    );
}

export default PreviewBar;