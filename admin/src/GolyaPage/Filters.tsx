import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

import { InitialState } from '../utils/types';
import { formatDate } from '../utils/utils';
import { changeFilter } from '../actions';

enum Napok {
    hetfo,
    kedd,
    szerda,
    csutortok,
    pentek,
}

enum FilterType {
    nev,
    hetfo,
    kedd,
    szerda,
    csutortok,
    pentek,
    szak,
    minId,
    maxId,
    minRegDate,
    maxRegDate
}

const FilterList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
`;

const FilterItem = styled.li`
    cursor: pointer;
    padding: 8px 10px;
    margin: 0px 10px;
    border-radius: 30px;
    background-color: #28A745;
    color: white;
`;


const Filters = () => {

    const dispatch = useDispatch();

    const [showFilters, setShowFilters] = useState<boolean>(false);

    const filters = useSelector((state: InitialState) => {return state.filters});

    const changeShowFilter = () => {
        setShowFilters(!showFilters);
    }

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") {
            setNevFilter("")
            return
        }
        setNevFilter(event.target.value);
    }

    const onDayChange = (event: React.ChangeEvent<HTMLInputElement>, id: Napok) => {
        setNapFilter(id, event.target.checked);
    }

    const onSzakSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const options = event.target.options;
        const selectedOptions = [];

        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedOptions.push(options[i].value)
            }
        }
        setSzakFilter(selectedOptions);
    }

    const onMinIdChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdFilter("min", parseInt(event.target.value));
    }

    const onMaxIdChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdFilter("max", parseInt(event.target.value));
    }

    const onMinRegDateChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateFilter("min", new Date(event.target.value).getTime());
    }

    const onMaxRegDateChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateFilter("max", new Date(event.target.value).getTime());
    }

    const setNevFilter = (ujNev: string) => {
        dispatch(changeFilter("nev", ujNev));
    }

    const setNapFilter = (nap: Napok, ujNap: boolean) => {
        switch (nap) {
            case Napok.hetfo:
                dispatch(changeFilter("hetfo", ujNap));
                break;
            case Napok.kedd:
                dispatch(changeFilter("kedd", ujNap));
                break;
            case Napok.szerda:
                dispatch(changeFilter("szerda", ujNap));
                break;
            case Napok.csutortok:
                dispatch(changeFilter("csutortok", ujNap));
                break;
            case Napok.pentek:
                dispatch(changeFilter("pentek", ujNap));
                break;
        }
    }

    const setSzakFilter = (szakok: string[]) => {
        dispatch(changeFilter("szak", szakok));
    }

    const setIdFilter = (type: "min" | "max", ujId: number) => {
        dispatch(changeFilter(`${type}Id`, ujId));
    }

    const setDateFilter = (type: "min" | "max", ujDate: number) => {
        dispatch(changeFilter(`${type}RegDate`, ujDate));
    }

    const getActiveFilters = () => {
        const aktivSzurok : any[] = [];

        if (filters.nev !== "") {
            aktivSzurok.push(<FilterItem key="nev" onClick={() => removeFilter(FilterType.nev)} >Név: {filters.nev}</FilterItem>)
        }

        if (filters.nap.hetfo) {
            aktivSzurok.push(<FilterItem key="hetfo" onClick={() => removeFilter(FilterType.hetfo)} >Hétfő</FilterItem>)
        }
        if (filters.nap.kedd) {
            aktivSzurok.push(<FilterItem key="kedd" onClick={() => removeFilter(FilterType.kedd)} >Kedd</FilterItem>)
        }
        if (filters.nap.szerda) {
            aktivSzurok.push(<FilterItem key="szerda" onClick={() => removeFilter(FilterType.szerda)} >Szerda</FilterItem>)
        }
        if (filters.nap.csutortok) {
            aktivSzurok.push(<FilterItem key="csutortok" onClick={() => removeFilter(FilterType.csutortok)} >Csütörtök</FilterItem>)
        }
        if (filters.nap.pentek) {
            aktivSzurok.push(<FilterItem key="pentek" onClick={() => removeFilter(FilterType.pentek)} >Péntek</FilterItem>)
        }

        filters.szak.forEach(szak => {
            aktivSzurok.push(<FilterItem key={szak} onClick={() => removeFilter(FilterType.szak, szak)} >{szak}</FilterItem>)
        })

        if (filters.minId > 0) {
            aktivSzurok.push(<FilterItem key="minId" onClick={() => removeFilter(FilterType.minId)}>Min ID: {filters.minId} </FilterItem>)
        }
        if (filters.maxId > 0) {
            aktivSzurok.push(<FilterItem key="maxId" onClick={() => removeFilter(FilterType.maxId)}>Max ID: {filters.maxId} </FilterItem>)
        }
        if (filters.regDateKezdo > 0) {
            aktivSzurok.push(<FilterItem key="minRegDate" onClick={() => removeFilter(FilterType.minRegDate)}>Regisztráció eleje: {formatDate(filters.regDateKezdo, "short")} </FilterItem>)
        }
        if (filters.regDateUtolso > 0) {
            aktivSzurok.push(<FilterItem key="maxRegDate" onClick={() => removeFilter(FilterType.maxRegDate)}>Regisztráció vége: {formatDate(filters.regDateUtolso, "short")} </FilterItem>)
        }

        if (aktivSzurok.length > 0) {
            return <div className="mt-3">
                        <h3>Aktív szűrők</h3>
                            <FilterList>
                                {aktivSzurok}
                            </FilterList>
                    </div>
        }
        return null;
    }

    const removeFilter = (type: FilterType, text?: string) => {
        switch (type) {
            case FilterType.nev:
                setNevFilter("")
                break;
            case FilterType.hetfo:
                setNapFilter(Napok.hetfo, false);
                break;
            case FilterType.kedd:
                setNapFilter(Napok.kedd, false);
                break;
            case FilterType.szerda:
                setNapFilter(Napok.szerda, false);
                break;
            case FilterType.csutortok:
                setNapFilter(Napok.csutortok, false);
                break;
            case FilterType.pentek:
                setNapFilter(Napok.pentek, false);
                break;
            case FilterType.szak:
                const szakok = Object.assign([], filters.szak);
                const index = filters.szak.indexOf(text!)
                if (index !== -1) {
                    szakok.splice(index, 1);
                }
                setSzakFilter(szakok);
                break;
            case FilterType.minId:
                setIdFilter("min", 0);
                break;
            case FilterType.maxId:
                setIdFilter("max", 0);
                break;
            case FilterType.minRegDate:
                setDateFilter("min", 0);
                break;
            case FilterType.maxRegDate:
                setDateFilter("max", 0);
                break;
            default:
                break;
        }
    }

    const ctrlText =  /mac/i.test(navigator.userAgent) ? "Cmd" : "Ctrl";

    const filterForm = showFilters ? <>
        <Form>
            <Form.Row>
                <Col>
                    <Form.Group controlId="nevFilter">
                        <Form.Label>Név</Form.Label>
                        <Form.Control type="text" placeholder="Név" onChange={onNameChange} value={filters.nev}></Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <p>Napok</p>
                    <div>
                        <Form.Check
                            inline
                            label="Hétfő"
                            type='checkbox'
                            id='hetfo'
                            checked={filters.nap.hetfo}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {onDayChange(event, Napok.hetfo)}}
                        />
                        <Form.Check
                            inline
                            label="Kedd"
                            type='checkbox'
                            id='kedd'
                            checked={filters.nap.kedd}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {onDayChange(event, Napok.kedd)}}
                        />
                        <Form.Check
                            inline
                            label="Szerda"
                            type='checkbox'
                            id='szerda'
                            checked={filters.nap.szerda}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {onDayChange(event, Napok.szerda)}}
                        />
                        <Form.Check
                            inline
                            label="Csütörtök"
                            type='checkbox'
                            id='csutortok'
                            checked={filters.nap.csutortok}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {onDayChange(event, Napok.csutortok)}}
                        />
                        <Form.Check
                            inline
                            label="Péntek"
                            type='checkbox'
                            id='pentek'
                            checked={filters.nap.pentek}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {onDayChange(event, Napok.pentek)}}
                        />
                    </div>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Group controlId="szakFilter">
                        <Form.Label>Szak</Form.Label>
                        <Form.Control as="select" multiple onChange={onSzakSelected} value={filters.szak}>
                            <option value="ginf">Gazdinfo</option>
                            <option value="hr">HR</option>
                            <option value="tv">TV</option>
                            <option value="gm">GM</option>
                        </Form.Control>
                        <Form.Text className="text-muted">Több kiválasztásához nyomj {ctrlText}-t</Form.Text>
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Group controlId="minIdFilter">
                        <Form.Label>Kezdő ID</Form.Label>
                        <Form.Control type="number" placeholder="Kezdő ID" onChange={onMinIdChanged} value={filters.minId}></Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="maxIdFilter">
                        <Form.Label>Utolsó ID</Form.Label>
                        <Form.Control type="number" placeholder="Utolsó ID" onChange={onMaxIdChanged} value={filters.maxId}></Form.Control>
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Group controlId="kezdoRegDateFilter">
                        <Form.Label>Regisztráció idő eleje</Form.Label>
                        <Form.Control type="datetime-local" onChange={onMinRegDateChanged} value={formatDate(filters.regDateKezdo, "long")}></Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="utolsoRegDateFilter">
                        <Form.Label>Regisztráció idő vége</Form.Label>
                        <Form.Control type="datetime-local" onChange={onMaxRegDateChanged} value={formatDate(filters.regDateUtolso, "long")}></Form.Control>
                    </Form.Group>
                </Col>
            </Form.Row>
        </Form>
        {getActiveFilters()}
    </>
    : null;

    const arrow = showFilters ? <span> &#x25B2; </span> : <span> &#x25BC; </span>;

    return (
        <div className="mt-3">
            <h2 onClick={changeShowFilter} style={{cursor: "pointer", userSelect: "none"}}>Szűrők {arrow}</h2>
            { filterForm }
        </div>
    );
}

export default Filters;