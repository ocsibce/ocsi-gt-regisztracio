import React from 'react';
import { useSelector } from 'react-redux';
import { InitialState } from '../../utils/types';

const List : React.FC = props => {

    const settings = useSelector((state: InitialState) => state.settings);

    const listItems = settings.map(setting => <li key={setting.nev}> {setting.ev} - {setting.nev} </li>)

    return (
        <>
            List
            <ul>
                {listItems}
            </ul>
        </>
    );
}

export default List;