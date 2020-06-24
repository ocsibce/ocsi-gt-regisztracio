import React from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { InitialState } from '../utils/types';

const GolyaList = () => {

    const golyak = useSelector((state: InitialState) => state.filteredGolyaLista);

    const tableRows = golyak.map((golya) => {
        const {id, nev, email, szak} = golya;
        return <tr key={id}>
            <td>{id}</td>
            <td>{nev}</td>
            <td>{email}</td>
            <td>{szak}</td>
        </tr>
    })

    return <>
        <Table striped bordered hover size="sm" variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Név</th>
                    <th>E-mail</th>
                    <th>Szak</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </Table>
    </>;
}

export default GolyaList;