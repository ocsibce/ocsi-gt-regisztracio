import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ArrayInput from './ArrayInput';
import { Szak, SettingsData, Markdown } from '../../utils/types';
import { formatDate } from '../../utils/utils';
import ocsiApi  from '../../API/ocsiApi';
import { AxiosResponse, AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { settingsSave } from '../../State/actions';

const SettingsForm : React.FC = props => {

    const dispatch = useDispatch();

    const [ev, setEv] = useState("");
    const [nev, setNev] = useState("");
    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState(Date.now());
    const [fontosInformaciok, setFontosInformaciok] = useState<string[]>([]);
    const [fontosInformaciokEn, setFontosInformaciokEN] = useState<string[]>([]);
    const [regMenet, setRegMenet] = useState<string[]>([]);
    const [regMenetEN, setRegMenetEN] = useState<string[]>([]);
    const [szakok, setSzakok] = useState<Szak[]>([]);
    const [szakokEN, setSzakokEN] = useState<Szak[]>([]);
    const [adatkezeles, setAdatkezeles] = useState<Markdown[]>([]);
    const [adatkezelesEN, setAdatkezelesEN] = useState<Markdown[]>([]);
    const [hazirend, setHazirend] = useState<Markdown[]>([]);
    const [hazirendEN, setHazirendEN] = useState<Markdown[]>([]);
    const [bannerLink, setBannerLink] = useState("");
    const [validated, setValidated] = useState(false);

    const validateForm = () => {
        if (ev === "") {
            setValidated(false)
            return false;
        }
        if (startDate < 1577836800000 && endDate < 1577836800000) {
            setValidated(false)
            return false;
        }
        if (fontosInformaciok.length < 1 && regMenet.length < 1 && szakok.length < 1 && adatkezeles.length < 1 && hazirend.length < 1 ) {
            setValidated(false)
            return false;
        }
        setValidated(true)
        return true;
    }

    useEffect(() => {validateForm()}, [
        ev, nev, startDate, endDate,
        fontosInformaciok, fontosInformaciokEn,
        regMenet, regMenetEN, szakok, szakokEN,
        adatkezeles, adatkezelesEN, hazirend, hazirendEN,
        bannerLink
    ]);

    const handleSubmit = () => {
        dispatch(settingsSave());
        const postData: SettingsData = {
            ev,
            nev,
            start_date: startDate/1000,
            end_date: endDate/1000,
            reszletek: {
                "fontosInformaciok": fontosInformaciok,
                "regisztracioMenete": regMenet
            },
            reszletek_en: {
                "fontosInformaciok": fontosInformaciokEn,
                "regisztracioMenete": regMenetEN
            },
            szakok,
            szakok_en: szakokEN,
            adatkezeles,
            adatkezeles_en: adatkezelesEN,
            hazirend,
            hazirend_en: hazirendEN,
            banner_link: bannerLink,
            eles: false,
            preview: false
        };

        ocsiApi.post('/settings/create.php', postData, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        }).then((resp: AxiosResponse) => {
            console.log(resp.status);
            dispatch(settingsSave());
        }).catch((err: AxiosError) => {
            console.log(err);
            if (err.code === '403') {
                console.log('Duplicate')
            }
            dispatch(settingsSave());
        })
    }

    return (
        <Jumbotron>
            <Form >
                {/* Ev, Nev */}
                <Row>
                    <Col>
                    <Form.Group controlId="nev">
                        <Form.Label>Név</Form.Label>
                        <Form.Control type="text" placeholder="Név" value={nev} onChange={(event) => setNev(event.target.value)} />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="ev">
                        <Form.Label>Év</Form.Label>
                        <Form.Control type="text" placeholder="Év" value={ev} onChange={(event) => setEv(event.target.value)}  />
                    </Form.Group>
                    </Col>
                </Row>
                {/* Datumok */}
                <Row>
                    <Col>
                    <Form.Group controlId="start_date">
                        <Form.Label>Regisztráció kezdete</Form.Label>
                        <Form.Control type="datetime-local" value={formatDate(startDate, "long")} onChange={(event) => setStartDate(new Date(event.target.value).getTime())} />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="end_date">
                        <Form.Label>Regisztráció vége</Form.Label>
                        <Form.Control type="datetime-local" value={formatDate(endDate, "long")} onChange={(event) => setEndDate(new Date(event.target.value).getTime())} />
                    </Form.Group>
                    </Col>
                </Row>
                {/* Fontos Infok */}
                <Row>
                    <ArrayInput
                        inputName="Fontos információk"
                        inputId="fontosInfok"
                        data={fontosInformaciok}
                        setter={setFontosInformaciok}
                        type="string"
                    />
                    <ArrayInput
                        inputName="Fontos információk (angol)"
                        inputId="fontosInfok_en"
                        data={fontosInformaciokEn}
                        setter={setFontosInformaciokEN}
                        type="string"
                    />
                </Row>
                {/* Regisztracio Menete */}
                <Row>
                    <ArrayInput
                        inputName="Regisztráció Menete"
                        inputId="regisztracioMenete"
                        data={regMenet}
                        setter={setRegMenet}
                    />
                    <ArrayInput
                        inputName="Regisztráció Menete (angol)"
                        inputId="regisztracioMenete_en"
                        data={regMenetEN}
                        setter={setRegMenetEN}
                    />
                </Row>
                {/* Szakok */}
                <Row>
                    <ArrayInput
                        inputName="Szakok"
                        inputId="szakok"
                        data={szakok}
                        setter={setSzakok}
                        type="szak"
                    />
                    <ArrayInput
                        inputName="Szakok (angol)"
                        inputId="szakok_en"
                        data={szakokEN}
                        setter={setSzakokEN}
                        type="szak"
                    />
                </Row>
                {/* Adatkezeles */}
                <Row>
                    <ArrayInput
                        inputName="Adatkezelési nyilatkozat"
                        inputId="adatkezeles"
                        data={adatkezeles}
                        setter={setAdatkezeles}
                        type="markdown"
                    />
                    <ArrayInput
                        inputName="Adatkezelési nyilatkozat (angol)"
                        inputId="adatkezeles_en"
                        data={adatkezelesEN}
                        setter={setAdatkezelesEN}
                        type="markdown"
                    />
                </Row>
                {/* Hazirend */}
                <Row>
                    <ArrayInput
                        inputName="Házirend"
                        inputId="hazirend"
                        data={hazirend}
                        setter={setHazirend}
                        type="markdown"
                    />
                    <ArrayInput
                        inputName="Házirend (angol)"
                        inputId="hazirend_en"
                        data={hazirendEN}
                        setter={setHazirendEN}
                        type="markdown"
                    />
                </Row>
                {/* Banner */}
                <Form.Group controlId="banner_link">
                    <Form.Label>Borítókép linkje</Form.Label>
                    <Form.Control type="text" value={bannerLink} onChange={(event) => setBannerLink(event.target.value)} />
                </Form.Group>
                <Button onClick={handleSubmit} disabled={!validated}>
                    Hozzáadás
                </Button>
            </Form>
        </Jumbotron>
    );
}

export default SettingsForm;