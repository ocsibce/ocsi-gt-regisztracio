import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Control from './Control';
import Filters from './Filters';
import GolyaList from './GolyaList';

const Golyak = () => {

    // TODO - Request data
    // TODO - Show data
    // TODO - Export CSV
    // TODO - Filtering
    // TODO - Delete all data

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