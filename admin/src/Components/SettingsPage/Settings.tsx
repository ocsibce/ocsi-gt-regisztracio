import React, { useEffect } from 'react';
import ocsiApi from '../../API/ocsiApi';
import { AxiosResponse, AxiosError } from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SettingsForm from './Form';
import List from './List';
import { useDispatch, useSelector } from 'react-redux';
import { InitialState } from '../../utils/types';
import { settingsResponse } from '../../State/actions';

const SettingsPage : React.FC = props => {

    const dispatch = useDispatch();
    const reloadSettings = useSelector((state: InitialState) => (state.savingSettings));

    useEffect(() => {
        ocsiApi.get('/settings/read.php').then((resp: AxiosResponse) => {
            dispatch(settingsResponse(resp.data.records))
        }).catch((err: AxiosError) => {
            console.log(err);
        })
    }, [reloadSettings])

    return (
    <Container>
        <Row>
            <h1>Beállítások</h1>
        </Row>
        <Row>
            <Col xs={3}>
                <List />
            </Col>
            <Col>
                <SettingsForm />
            </Col>
        </Row>
    </Container>
    );
}

export default SettingsPage;