import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {BsArrowUp, BsArrowDown, BsPencil ,BsFillTrashFill} from 'react-icons/bs';
import styled from 'styled-components';
import { Szak, Markdown, MarkdownType } from '../../utils/types';

type PropTypes = {
    inputName: string,
    inputId: string,
    data: any[],
    setter: React.Dispatch<React.SetStateAction<any[]>>,
    type?: "string" | "szak" | "markdown"
};

const TableCellIcon = styled.td`
    cursor: pointer;
    text-align: center;
    position: relative;

    svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    :hover {
        background-color: #f8f9fa;
        color: #343a40;
    }
`;

const TableCellText = styled.td`
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-all;
`;

const MaxWidthTable = styled(Table)`
    display: block;
    width: 100%;
    border-collapse: collapse;
`;

const FullWidthTbody = styled.tbody`
    display: table;
    min-width: 100%;
    width: 100%;
    max-width: inherit;
`;

const MaxWidthTableRow = styled.tr`
    width: 100%;
`;

const ArrayInput = ({inputName, inputId, data, setter, type = "string"}: PropTypes) => {

    const [inputText, setInputText] = useState("");
    const [inputSzak, setInputSzak] = useState<Szak>({name: "", betelt: false, key: ""})
    const [inputMarkdown, setInputMarkdown] = useState<Markdown>({type: MarkdownType.paragraph, text: ""});
    const [currentlyEditing, setCurrentlyEditing] = useState(-1);

    const setStateEmpty = () => {
        switch (type) {
            case "string":
                setInputText("");
                break;
            case "szak":
                setInputSzak({name: "", betelt: false, key: ""});
                break;
            case "markdown":
                setInputMarkdown({type: MarkdownType.paragraph, text: ""});
                break;
        }
    }

    const setStateValue = (data: any) => {
        switch (type) {
            case "string":
                setInputText(data);
                break;
            case "szak":
                setInputSzak({name: data.name, betelt: data.betelt, key: data.key});
                break;
            case "markdown":
                setInputMarkdown({type: data.type, text: data.text});
                break;
        }
    }

    const saveText = (input: any) => {
        if (currentlyEditing === -1) {
            setter([...data, input]);
        } else {
            let d = [...data];
            d.splice(currentlyEditing, 0, input);
            setter(d);
            setCurrentlyEditing(-1);
        }
        setStateEmpty();
    }

    const moveItem = (idx: number, secondIdx: number) => {
        let d = [...data];
        [d[idx], d[secondIdx]] = [d[secondIdx], d[idx]];
        setter(d);
    }

    const editItem = (idx: number) => {
        setStateValue(data[idx]);
        setCurrentlyEditing(idx);
        let d = [...data];
        d.splice(idx, 1);
        setter(d);
    }

    const deleteItem = (idx: number) => {
        let d = [...data];
        d.splice(idx, 1);
        setter(d);
    }

    const setSzakBetelt = (idx: number) => {
        let d = [...data];
        d[idx].betelt = !d[idx].betelt;
        setter(d);
    }

    const getTableRow = (d: any, idx: number) => {
        switch (type) {
            case "string":
                return (
                    <MaxWidthTableRow key={d}>
                        <td>{idx + 1}</td>
                        <TableCellText>{d}</TableCellText>
                        <TableCellIcon
                            onClick={idx === 0 ? () => {} : () => moveItem(idx, idx-1)}
                        >
                            {idx === 0 ? null : <BsArrowUp /> }
                        </TableCellIcon>
                        <TableCellIcon
                            onClick={idx === data.length - 1 ? () => {} : () => moveItem(idx, idx+1)}
                        >
                            {idx === data.length - 1 ? null : <BsArrowDown /> }
                        </TableCellIcon>
                        <TableCellIcon
                            onClick={() => {editItem(idx)}}
                        >
                            <BsPencil />
                        </TableCellIcon>
                        <TableCellIcon
                            onClick={() => {deleteItem(idx)}}
                        >
                            <BsFillTrashFill />
                        </TableCellIcon>
                    </MaxWidthTableRow>
                );
            case "szak":
                return (
                    <MaxWidthTableRow key={d.key}>
                        <TableCellText>{d.key}</TableCellText>
                        <TableCellText>{d.name}</TableCellText>
                        <TableCellText>
                            <Form.Check
                                inline
                                label="betelt"
                                type='checkbox'
                                id={d.key}
                                checked={d.betelt}
                                onChange={() => setSzakBetelt(idx)}
                            />
                        </TableCellText>
                        <TableCellIcon
                            onClick={idx === 0 ? () => {} : () => moveItem(idx, idx-1)}
                        >
                            {idx === 0 ? null : <BsArrowUp /> }
                        </TableCellIcon>
                        <TableCellIcon
                            onClick={idx === data.length - 1 ? () => {} : () => moveItem(idx, idx+1)}
                        >
                            {idx === data.length - 1 ? null : <BsArrowDown /> }
                        </TableCellIcon>
                        <TableCellIcon
                            onClick={() => {editItem(idx)}}
                        >
                            <BsPencil />
                        </TableCellIcon>
                        <TableCellIcon
                            onClick={() => {deleteItem(idx)}}
                        >
                            <BsFillTrashFill />
                        </TableCellIcon>
                    </MaxWidthTableRow>
                );
            case "markdown":
                return (
                    <MaxWidthTableRow key={d.text}>
                        <TableCellText>{d.type === MarkdownType.heading ? "Fejléc" : "Bekezdés"}</TableCellText>
                        <TableCellText>{d.text}</TableCellText>
                        <TableCellIcon
                            onClick={idx === 0 ? () => {} : () => moveItem(idx, idx-1)}
                        >
                            {idx === 0 ? null : <BsArrowUp /> }
                        </TableCellIcon>
                        <TableCellIcon
                            onClick={idx === data.length - 1 ? () => {} : () => moveItem(idx, idx+1)}
                        >
                            {idx === data.length - 1 ? null : <BsArrowDown /> }
                        </TableCellIcon>
                        <TableCellIcon
                            onClick={() => {editItem(idx)}}
                        >
                            <BsPencil />
                        </TableCellIcon>
                        <TableCellIcon
                            onClick={() => {deleteItem(idx)}}
                        >
                            <BsFillTrashFill />
                        </TableCellIcon>
                    </MaxWidthTableRow>
                );
        }
    }

    const getDataTable = () => {
        if (data.length === 0) {
            return null;
        }
        const tableRows = data.map((d, idx) => getTableRow(d, idx));

        return (
            <MaxWidthTable striped bordered variant='dark'>
                <FullWidthTbody>
                    {tableRows}
                </FullWidthTbody>
            </MaxWidthTable>
        );
    }

    const getInput = () => {
        switch (type) {
            case "string":
                return (
                    <InputGroup>
                        <Form.Control type="text" value={inputText} onChange={(event) => setInputText(event.target.value)}/>
                        <InputGroup.Append>
                            <Button variant='outline-success' onClick={() => saveText(inputText)}>Hozzáad</Button>
                        </InputGroup.Append>
                    </InputGroup>
                );
            case "szak":
                return (
                    <InputGroup>
                        <Form.Control type="text" value={inputSzak.key} placeholder="Kulcs" onChange={(event) => setInputSzak({ ...inputSzak, key: event.target.value})}/>
                        <Form.Control type="text" value={inputSzak.name} placeholder="Név" onChange={(event) => setInputSzak({ ...inputSzak, name: event.target.value})}/>
                        <InputGroup.Append>
                            <Button variant='outline-success' onClick={() => saveText(inputSzak)}>Hozzáad</Button>
                        </InputGroup.Append>
                    </InputGroup>
                );
            case "markdown":
                return (
                    <InputGroup>
                        <DropdownButton
                            as={InputGroup.Prepend}
                            variant="outline-secondary"
                            title={inputMarkdown.type === MarkdownType.heading ? "Fejléc" : "Bekezdés"}
                            id={`dropdown-${inputId}`}
                        >
                            <Dropdown.Item onClick={() => setInputMarkdown({ ...inputMarkdown, type: MarkdownType.heading})}>Fejléc</Dropdown.Item>
                            <Dropdown.Item onClick={() => setInputMarkdown({ ...inputMarkdown, type: MarkdownType.paragraph})}>Bekezdés</Dropdown.Item>
                        </DropdownButton>
                        <Form.Control type="text" value={inputMarkdown.text} onChange={(event) => setInputMarkdown({ ...inputMarkdown ,text: event.target.value})}/>
                        <InputGroup.Append>
                            <Button variant='outline-success' onClick={() => saveText(inputMarkdown)}>Hozzáad</Button>
                        </InputGroup.Append>
                    </InputGroup>
                );
        }
    }

    return (
        <Col sm={6}>
            <Form.Group controlId={inputId}>
                <Form.Label>{inputName}</Form.Label>
                {getInput()}
            </Form.Group>
            {getDataTable()}
        </Col>
    );
}

export default ArrayInput;