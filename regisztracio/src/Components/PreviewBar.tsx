import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { timeChanged, resultChanged } from '../State/actions';
import { Time, InitialState, Result } from '../utils/types';

const TopBar = styled.div`

`;

const TopBarRow = styled.div`
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
    const {time, result, loading} = useSelector((state: InitialState) => state);

    const changeTime = (time: Time) => {
        dispatch(timeChanged(time))
    }

    const changeResult = (result: Result) => {
        dispatch(resultChanged(result));
    }

    const resultRow = time === "during" ? (<TopBarRow>
        <div>Eredmény</div>
        <div>
            <input
                type="radio"
                name="result"
                id="sikers"
                onChange={() => {
                    changeResult("sikeres");
                }}
                checked={result === "sikeres"}
            />
            <label htmlFor="sikeres">Sikeres regisztráció</label>
        </div>
        <div>
            <input
                type="radio"
                name="result"
                id="sikertelen"
                onChange={() => {
                    changeResult("sikertelen");
                }}
                checked={result === "sikertelen"}
            />
            <label htmlFor="sikertelen">Sikertelen regisztráció</label>
        </div>
        <div>
            <input
                type="radio"
                name="result"
                id="dupla"
                onChange={() => {
                    changeResult("dupla");
                }}
                checked={result === "dupla"}
            />
            <label htmlFor="dupla">Ismétlődő regisztráció</label>
        </div>
        <div>
            <input
                type="radio"
                name="result"
                id="none"
                onChange={() => {
                    changeResult(null);
                }}
                checked={result === null}
            />
            <label htmlFor="none">Regisztráció előtt</label>
        </div>
    </TopBarRow>)
        : null;
    return (
        <TopBar>
            {loading? null : <>
                <TopBarRow>
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
                        checked={time === "before"}
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
                        checked={time === "during"}
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
                        checked={time === "after"}
                    />
                    <label htmlFor="after">Regisztráció után</label>
                </div>
            </TopBarRow>
            {resultRow}
            </>
            }
        </TopBar>
    );
}

export default PreviewBar;