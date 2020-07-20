import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RegisztracioAdat, InitialState } from '../../utils/types';
import { useSelector } from 'react-redux';

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 32px;
`;

const FormCol = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 45%;
    margin-top: 24px;
    margin-bottom: 24px;
`;

const FormColLast = styled(FormCol)`
    width: 60%;
    margin-top: 48px;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
`;

const InputGroupDays = styled(InputGroup)`
    flex-direction: column;
`;

const BoxContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const DaysContainer = styled(BoxContainer)`
    justify-content: center;
    align-items: center;
    margin-top: 8px;

    @media (max-width: 530px) {
        flex-wrap: wrap;
        justify-content: space-around;
    }
`;

const DayGroup = styled.div`
    @media (max-width: 530px) {
        margin-top: 8px;
    }
`;

const Label = styled.label`
    margin-right: 6px;
`;

const BoxLabel = styled.label`
    margin-left: 2px;
    margin-right: 8px;
`;

const FormHeader = styled.h2``;

const Input = styled.input`
    border: none;
    outline: none;
    background-color: transparent;
    padding: 6px 12px;
    margin: 4px 0;
    border-bottom: 2px solid black;
    min-width: 172px;
`;

const Select = styled.select`
    border: none;
    outline: none;
    background-color: transparent;
    padding: 6px 12px;
    margin: 4px 0;
    border-bottom: 2px solid black;
    min-width: 172px;
`;

const Button = styled.button`
    box-shadow: 0px 0px 0px 2px #9fb4f2;
	border-radius:10px;
	display:inline-block;
	color:#ffffff;
	font-size:24px;
	padding:12px 37px;
	text-decoration:none;
    text-shadow:0px 1px 0px #283966;
    margin: 24px 0;
`;

const ActiveButton = styled(Button)`
    background:linear-gradient(to bottom, #7892c2 5%, #476e9e 100%);
    background-color:#7892c2;
    cursor:pointer;
    border:1px solid #4e6096;

    &:hover {
        background:linear-gradient(to bottom, #476e9e 5%, #7892c2 100%);
	    background-color:#476e9e;
    }

    &:active {
	    position:relative;
	    top:1px;
    }
`;

const DisabledButton = styled(Button)`
    background-color: #666;
`;

const Form : React.FC = props => {

    const [regAdat, setRegAdat] = useState<RegisztracioAdat>({
        nev: "",
        email: "",
        telefonszam: "",
        lakcim: {
            irszam: 0,
            varos: "",
            utca: ""
        },
        nem: null,
        oktazonosito: null,
        szulDatum: "",
        szulHely: "",
        anyjaNeve: "",
        allergia: "",
        etelerzekeny: "",
        szak: "",
        polo: "",
        napok: {
            hetfo: false,
            kedd: false,
            szerda: false,
            csutortok: false,
            pentek: false,
        },
        egyeb: ""
    })
    const [isFormValid, setIsFormValid] = useState(false);

    const szakok = useSelector((state: InitialState) => state.szakok);

    const szakOptions = szakok!.map((szak) => {
        return <option value={szak.id}>{szak.name}</option>
    })

    useEffect(() => {
        validateForm();
    }, [regAdat])

    const nevChange = (event: any) => {
        const nev = event.target.value;
        setRegAdat({
            ...regAdat,
            nev
        })
    }

    const emailChange = (event: any) => {
        const email = event.target.value;
        setRegAdat({
            ...regAdat,
            email
        })
    }

    const telefonChange = (event: any) => {
        const telefonszam = event.target.value;
        setRegAdat({
            ...regAdat,
            telefonszam
        });
    }

    const irszamChange = (event: any) => {
        const irszam = event.target.value;
        setRegAdat({
            ...regAdat,
            lakcim: {
                ...regAdat.lakcim,
                irszam
            }
        });
    }

    const varosChange = (event: any) => {
        const varos = event.target.value;
        setRegAdat({
            ...regAdat,
            lakcim: {
                ...regAdat.lakcim,
                varos
            }
        });
    };

    const utcaChange = (event: any) => {
        const utca = event.target.value;
        setRegAdat({
            ...regAdat,
            lakcim: {
                ...regAdat.lakcim,
                utca
            }
        });
    }

    const nemChange = (nemBool: boolean) => {
        setRegAdat({
            ...regAdat,
            nem: nemBool
        });
    }

    const oktAzChange = (event: any) => {
        const oktazonosito = event.target.value;
        setRegAdat({
            ...regAdat,
            oktazonosito
        });
    }

    const szulDatumChange = (event: any) => {
        const szulDatum = event.target.value;
        setRegAdat({
            ...regAdat,
            szulDatum
        });
    }

    const szulHelyChange = (event: any) => {
        const szulHely = event.target.value;
        setRegAdat({
            ...regAdat,
            szulHely
        });
    }

    const anyjaNeveChange = (event: any) => {
        const anyjaNeve = event.target.value;
        setRegAdat({
            ...regAdat,
            anyjaNeve
        });
    }

    const allergiaChange = (event: any) => {
        const allergia = event.target.value;
        setRegAdat({
            ...regAdat,
            allergia
        });
    }

    const etelChange = (event: any) => {
        const etelerzekeny = event.target.value;
        setRegAdat({
            ...regAdat,
            etelerzekeny
        });
    }

    const szakSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const szak = event.target.selectedOptions[0].value!;
        setRegAdat({
            ...regAdat,
            szak
        })
    }

    const poloSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const polo = event.target.selectedOptions[0].value!;
        setRegAdat({
            ...regAdat,
            polo
        });
    }

    const isMindenChecked = () => {
        const {hetfo, kedd, szerda, csutortok, pentek} = regAdat.napok;
        if(hetfo && kedd && szerda && csutortok && pentek) {
            return true;
        }
        return false;
    }

    const checkboxInput = (event: React.ChangeEvent<HTMLInputElement>,  nap: string) => {
        const val = event.target.checked!;
        switch (nap) {
            case "minden":
                setRegAdat({
                    ...regAdat,
                    napok: {
                        hetfo: val,
                        kedd: val,
                        szerda: val,
                        csutortok: val,
                        pentek: val
                    }
                })
                break;
            case "hetfo":
                setRegAdat({
                    ...regAdat,
                    napok: {
                        ...regAdat.napok,
                        hetfo: val
                    }
                });
                break;
            case "kedd":
                setRegAdat({
                    ...regAdat,
                    napok: {
                        ...regAdat.napok,
                        kedd: val
                    }
                });
                break;
            case "szerda":
                setRegAdat({
                    ...regAdat,
                    napok: {
                        ...regAdat.napok,
                        szerda: val
                    }
                });
                break;
            case "csutortok":
                setRegAdat({
                    ...regAdat,
                    napok: {
                        ...regAdat.napok,
                        csutortok: val
                    }
                });
                break;
            case "pentek":
                setRegAdat({
                    ...regAdat,
                    napok: {
                        ...regAdat.napok,
                        pentek: val
                    }
                });
                break;
            default:
                break;
        }
    }

    const egyebChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const egyeb = event.target.value;
        setRegAdat({
            ...regAdat,
            egyeb
        });
    }

    const onSubmit = (event: Event) => {
        event.preventDefault();
        console.log(regAdat);
        // TODO this
    }

    const validateForm = () => {
        if (regAdat.nev === "") {
            setIsFormValid(false);
            return;
        }
        const emailRegex = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)
        if (regAdat.email === "" && !emailRegex.test(regAdat.email)) {
            setIsFormValid(false);
            return;
        }
        const phoneRegex = /^[+0][0-9/-]{9,16}$/;
        if(regAdat.telefonszam === "" && !phoneRegex.test(regAdat.telefonszam)) {
            setIsFormValid(false);
            return;
        }
        if(regAdat.lakcim.irszam < 1000 || regAdat.lakcim.varos === "" || regAdat.lakcim.utca === "" || regAdat.szulDatum === "" || regAdat.szulHely === "" || regAdat.anyjaNeve === "") {
            setIsFormValid(false);
            return;
        }
        setIsFormValid(true);
    }

    return (
        <form>
            <FormContainer>
                <FormCol>
                    {/* Contact info */}
                    <InputGroup>
                        <Label htmlFor="nev">Név</Label>
                        <Input type="text" name="nev" id="nev" value={regAdat.nev} onChange={nevChange} />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="email">E-mail</Label>
                        <Input type="email" name="email" id="email" value={regAdat.email} onChange={emailChange} />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="telefonszam">Telefonszám</Label>
                        <Input type="text" name="telefonszam" id="telefonszam" value={regAdat.telefonszam} onChange={telefonChange} />
                    </InputGroup>
                    {/* Address */}
                    <FormHeader>Lakcím</FormHeader>
                    <InputGroup>
                        <Label htmlFor="irszam">Irányítószám</Label>
                        <Input type="number" name="irszam" id="irszam" value={regAdat.lakcim.irszam || 0} onChange={irszamChange} />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="varos">Város</Label>
                        <Input type="text" name="varos" id="varos" value={regAdat.lakcim.varos} onChange={varosChange} />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="utca">Utca</Label>
                        <Input type="text" name="utca" id="utca" value={regAdat.lakcim.utca} onChange={utcaChange} />
                    </InputGroup>
                </FormCol>
                <FormCol>
                    {/* Personal */}
                    <InputGroup>
                        <Label>Nem</Label>
                        <BoxContainer>
                            <div>
                                <input type="radio" name="nem" id="ferfi" checked={!!regAdat.nem} onChange={() => nemChange(true)} /> <BoxLabel htmlFor="ferfi">Férfi</BoxLabel>
                            </div>
                            <div>
                                <input type="radio" name="nem" id="no" checked={regAdat.nem === false} onChange={() => nemChange(false)} /> <BoxLabel htmlFor="no">Nő</BoxLabel>
                            </div>
                        </BoxContainer>
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="">Oktatási azonosító</Label>
                        <Input type="number" name="oktAz" id="oktAz" value={regAdat.oktazonosito || 0} onChange={oktAzChange} />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="szulDate">Születési dátum</Label>
                        <Input type="date" name="szulDate" id="szulDate" onChange={szulDatumChange} />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="szulHely">Születési hely</Label>
                        <Input type="text" name="szulHely" id="szulHely" value={regAdat.szulHely} onChange={szulHelyChange} />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="anyjaNeve">Anyja neve</Label>
                        <Input type="text" name="anyjaNeve" id="anyjaNeve" value={regAdat.anyjaNeve} onChange={anyjaNeveChange} />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="allergia">Allergia</Label>
                        <Input type="text" name="allergia" id="allergia" value={regAdat.allergia} onChange={allergiaChange} />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="etelerzekenyseg">Ételérzékenység</Label>
                        <Input type="text" name="etelerzekenyseg" id="etelerzekenyseg" value={regAdat.etelerzekeny} onChange={etelChange} />
                    </InputGroup>
                </FormCol>
                <FormColLast>
                    <InputGroup>
                        <Label>Szak</Label>
                        <Select name="szak" id="szak" onChange={szakSelect} value={regAdat.szak} >
                            {szakOptions}
                        </Select>
                    </InputGroup>
                    <InputGroup>
                        <Label>Póló méret</Label>
                        <Select name="polo" id="polo" onChange={poloSelect} value={regAdat.polo}>
                            <option value="xs">XS</option>
                            <option value="s">S</option>
                            <option value="m">M</option>
                            <option value="l">L</option>
                            <option value="xl">XL</option>
                        </Select>
                    </InputGroup>
                    <InputGroupDays>
                        <Label>Melyik napokra jössz?</Label>
                        <DaysContainer>
                            <DayGroup>
                                <input
                                    type="checkbox"
                                    name="minden"
                                    id="minden"
                                    checked={isMindenChecked()}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkboxInput(e, "minden")} />
                                <BoxLabel htmlFor="minden">Mindegyikre!</BoxLabel>
                            </DayGroup>
                            <DayGroup>
                                <input
                                    type="checkbox"
                                    name="hetfo"
                                    id="hetfo"
                                    checked={regAdat.napok.hetfo}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkboxInput(e, "hetfo")} />
                                <BoxLabel htmlFor="hetfo">Hétfő</BoxLabel>
                            </DayGroup>
                            <DayGroup>
                                <input
                                    type="checkbox"
                                    name="kedd"
                                    id="kedd"
                                    checked={regAdat.napok.kedd}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkboxInput(e, "kedd")} />
                                <BoxLabel htmlFor="kedd">Kedd</BoxLabel>
                            </DayGroup>
                            <DayGroup>
                                <input
                                    type="checkbox"
                                    name="szerda"
                                    id="szerda"
                                    checked={regAdat.napok.szerda}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkboxInput(e, "szerda")} />
                                <BoxLabel htmlFor="szerda">Szerda</BoxLabel>
                            </DayGroup>
                            <DayGroup>
                                <input
                                    type="checkbox"
                                    name="csutortok"
                                    id="csutortok"
                                    checked={regAdat.napok.csutortok}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkboxInput(e, "csutortok")} />
                                <BoxLabel htmlFor="csutortok">Csütörtök</BoxLabel>
                            </DayGroup>
                            <DayGroup>
                                <input
                                    type="checkbox"
                                    name="pentek"
                                    id="pentek"
                                    checked={regAdat.napok.pentek}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkboxInput(e, "pentek")} />
                                <BoxLabel htmlFor="pentek">Péntek</BoxLabel>
                            </DayGroup>
                        </DaysContainer>
                    </InputGroupDays>
                    <InputGroup>
                        <Label>Egyéb üzenet</Label>
                        <Input type="text" name="egyeb" id="egyeb" value={regAdat.egyeb} onChange={egyebChanged} />
                    </InputGroup>
                </FormColLast>
            </FormContainer>
            <h4>Biztos itt lesz valami házirend meg adatkezelési szabályzat</h4>
            {isFormValid ?
                <ActiveButton onClick={(event: any) => onSubmit(event as Event)}>Regisztráció</ActiveButton>
                :
                <DisabledButton disabled>Regisztráció</DisabledButton>
            }

        </form>
    );
}

export default Form;