import React, { useEffect, useState } from 'react';
import ocsiApi from '../../API/ocsiApi';
import { AxiosResponse, AxiosError } from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SettingsForm from './Form';
import List from './List';
import { useDispatch, useSelector } from 'react-redux';
import { InitialState } from '../../utils/types';
import { settingsResponse, editingSetting } from '../../State/actions';
import { useHistory } from 'react-router-dom';
import { getCookie } from 'react-use-cookie';

const SettingsPage : React.FC = props => {

    const dispatch = useDispatch();
    const reloadSettings = useSelector((state: InitialState) => (state.savingSettings));
    const [editedSetting, setEditedSetting] = useState(-1);
    const history = useHistory();
    const ocsiAuthToken = getCookie('ocsi-auth-token');

    useEffect(() => {
        if (typeof ocsiAuthToken == undefined) {
            history.push('/login');
        }
        if (ocsiAuthToken.length < 2) {
            history.push('/login');
        }
    }, []);

    useEffect(() => {
        ocsiApi.get('/settings/read.php', {
            headers: {
                'X_OCSI_AUTHORIZATION': `Bearer ${ocsiAuthToken}`
            }
        }).then(({data: {records}}) => {
            dispatch(settingsResponse(records))
        }).catch((err: AxiosError) => {
            console.log(err);
        })
    }, [reloadSettings])

    useEffect(() => {
        if (editedSetting !== -1) {
            ocsiApi.get(`/settings/readOne.php?id=${editedSetting}`, {
                headers: {
                    'X_OCSI_AUTHORIZATION': `Bearer ${ocsiAuthToken}`
                }
            }).then(({data}) => {
                dispatch(editingSetting(data));
            }).catch((err: AxiosError) => {
                console.log(err);
            })
        }
    }, [editedSetting])

    return (
    <Container>
        <Row>
            <h1>Beállítások</h1>
        </Row>
        <Row>
            <Col xs={3}>
                <List handleSelect={setEditedSetting} />
            </Col>
            <Col>
                <SettingsForm isEditing={editedSetting >= 0} finishedEditing={() => {setEditedSetting(-1)}}/>
            </Col>
        </Row>
    </Container>
    );
}

export default SettingsPage;