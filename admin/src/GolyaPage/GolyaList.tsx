import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';

type GolyaAdat = {
    nev: string;
    email: string;
    szak: string;
    telefonszam: string;
    cim: string;
    nem: "Férfi" | "Nő";
    oktatasiAzonosita: number;
    szuletesDatum: Date;
    szuletesHely: string;
    poloMeret: string;
    napok: Napok,
    anyjaNeve: string;
    allergia: string | null;
    etelerzekeny: string | null;
    egyeb: string | null;
    regisztralt: Date;
}

type Napok = {
    hetfo: boolean;
    kedd: boolean;
    szerda: boolean;
    csutortok: boolean;
    pentek: boolean;
}

type SzukGolyaAdat = {
    id: number;
    nev: string;
    email: string;
    szak: string;
}

const GolyaList = () => {

    const [golyak, setGolyak] = useState<SzukGolyaAdat[]>([]);

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