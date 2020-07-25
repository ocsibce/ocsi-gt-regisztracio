import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ocsiApi from '../../API/ocsiApi';
import { InitialState, SettingsData } from '../../utils/types';
import { settingsSave } from '../../State/actions';
import {BsFillTrashFill} from 'react-icons/bs';
import styled from 'styled-components';

const ActionButtonTableCell = styled.td`
    text-align: center;
    cursor: pointer;

    :hover {
        background-color: #f8f9fa;
        color: #343a40;
    }
`;


const List = (props: {handleSelect: React.Dispatch<React.SetStateAction<number>>}) => {

    const dispatch = useDispatch();
    const settings = useSelector((state: InitialState) => state.settings);
    const [elesID, setElesID] = useState(-1);
    const [previewID, setPreviewID] = useState(-1);

    const handleElesChecked = (id: number) => {
        setElesID(id);
    }

    const handlePreviewChecked = (id: number) => {
        setPreviewID(id);
    }

    const saveChanges = async () => {
        if (elesID >= 0 && previewID >= 0) {
            dispatch(settingsSave())
        }
        if (elesID >= 0) {
            const elesitResp = await ocsiApi.put('/settings/elesit.php', {
                id: elesID,
                eles: 1,
            }, { headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }}
            );
            console.log(elesitResp);
        }
        if (previewID >= 0) {
            const previewResp = await ocsiApi.put('/settings/preview.php', {
                id: previewID,
                preview: 1,
            }, { headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }});

            console.log(previewResp);
        }
        if (elesID >= 0 && previewID >= 0) {
            dispatch(settingsSave())
        }
    }

    const deleteSetting = async (id: number) => {
        dispatch(settingsSave());
        const deleteResp = await ocsiApi.delete(`/settings/delete.php?id=${id}`, { headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }});
        console.log(deleteResp);
        dispatch(settingsSave());
    }


    const getSettingRow = (setting: SettingsData) => {
        return (
            <tr key={setting.id!}>
                <ActionButtonTableCell onClick={() => props.handleSelect(setting.id!)} > {setting.ev} </ActionButtonTableCell>
                <ActionButtonTableCell onClick={() => props.handleSelect(setting.id!)} > {setting.nev} </ActionButtonTableCell>
                <td>
                    <Form.Check
                        type="radio"
                        id={`eles-${setting.nev}`}
                        name='eles'
                        checked={setting.eles === "1" || elesID === setting.id ? true : false}
                        onChange={() => handleElesChecked(setting.id!) }
                    />
                </td>
                <td> <Form.Check
                        type="radio"
                        id={`preview-${setting.nev}`}
                        name='preview'
                        checked={setting.preview === "1" || previewID === setting.id ? true: false}
                        onChange={() => handlePreviewChecked(setting.id!)}
                    /> </td>
                <ActionButtonTableCell onClick={() => deleteSetting(setting.id!)}> <BsFillTrashFill /> </ActionButtonTableCell>
            </tr>
        )
    }

    const getSettingsList = () => (
        settings.map(setting =>  getSettingRow(setting))
    )

    return (
        <>
            <Table striped bordered hover size='sm' variant='dark'>
                <thead>
                    <tr>
                        <th>Év</th>
                        <th>Név</th>
                        <th>Éles</th>
                        <th>Teszt</th>
                        <th>Törlés</th>
                    </tr>
                </thead>
                <tbody>
                    {getSettingsList()}
                </tbody>
            </Table>
            <Button onClick={saveChanges} disabled={elesID === -1 && previewID === -1}>
                Mentés
            </Button>
        </>
    );
}

export default List;