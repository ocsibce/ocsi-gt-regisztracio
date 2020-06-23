import React from 'react';
import Button from 'react-bootstrap/Button';

const Controls = () => {
    return (
        <>
            <Button variant="success" size="sm" block>CSV Letöltése</Button>
            <Button variant="danger" size="sm" block>Adatbázis kiürítése</Button>
        </>
    );
}

export default Controls;