import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { useDispatch } from 'react-redux';
import {AxiosResponse} from 'axios';
import ocsiApi from '../../API/ocsiApi';
import { golyaRequest } from '../../State/actions';

import Control from './Control';
import Filters from './Filters';
import GolyaList from './GolyaList';

const Golyak = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        ocsiApi.get('/golya/read.php').then((response: AxiosResponse) => {
          const golyaAdatok = response.data.records;
          const javitottGolyaAdatok = golyaAdatok.map((golya: any) => {
            golya.hetfo = golya.hetfo === "1";
            golya.kedd = golya.kedd === "1";
            golya.szerda = golya.szerda === "1";
            golya.csutortok = golya.csutortok === "1";
            golya.pentek = golya.pentek === "1";

            return golya;
          })
          dispatch(golyaRequest(javitottGolyaAdatok))
        })
      }, []);

    // DONE - Request data -> API needed
    // DONE - Show data
    // DONE - Export CSV
    // DONE - Filtering
    // BLOCKED - Delete all data -> API needed

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Gólyák</h1>
                    <Jumbotron>
                        <Control />
                        <Filters />
                        <GolyaList />
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
}

export default Golyak;