import React, {useState} from 'react';
import {setCookie} from 'react-use-cookie';
import ocsiApi from '../API/ocsiApi';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    let history = useHistory();


    const onSubmit = () => {
        ocsiApi.post('/user/login.php', {
            username: userName,
            password
        }).then(({data}) => {
            setCookie('ocsi-auth-token', data.token)
            history.push('/')
        }).catch((err: any) => {
            console.log(err);
        }) ;
    }

    return (
        <Container>
            <Jumbotron>
                <Form>
                    <Form.Group controlId="username">
                        <Form.Label>Felhasználói név</Form.Label>
                        <Form.Control type="text" placeholder="Felhasználó név" value={userName} onChange={(event) => setUserName(event.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Jelszó</Form.Label>
                        <Form.Control type="password" placeholder="Jelszó" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </Form.Group>
                    <Button onClick={onSubmit} >Bejelentkezés</Button>
                </Form>
            </Jumbotron>
        </Container>
    );
}

export default LoginPage;