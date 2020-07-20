export type Action = {
    type: string,
    payload: any
}

type Details = {
    regisztracioMenete: string[],
    fontosInformaciok: string[],
}

type Szak = {
    id: string,
    name: string
}

export type InitialState = {
    loading: Boolean
    preview: Boolean,
    time: Time,
    result: Result,
    startTime: Date,
    endTime: Date,
    details: Details
    szakok: Szak[] | null
}

export type RegisztracioAdat = {
    nev: string,
    email: string,
    telefonszam: string,
    lakcim: {
        irszam: number,
        varos: string,
        utca: string,
    },
    nem: boolean | null,
    oktazonosito: number | null,
    szulDatum: string,
    szulHely: string,
    anyjaNeve: string,
    allergia: string,
    etelerzekeny: string,
    szak: string,
    polo: string,
    napok: {
        hetfo: boolean,
        kedd: boolean,
        szerda: boolean,
        csutortok: boolean,
        pentek: boolean,
    },
    egyeb: string,
}

export type Time = "before" | "during" | "after";
export type Result = "sikeres" | "sikertelen" | "dupla" | null