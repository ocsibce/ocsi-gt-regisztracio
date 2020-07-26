export type Action = {
    type: string,
    payload: any
}

type Details = {
    regisztracioMenete: string[],
    fontosInformaciok: string[],
}

export type Szak = {
    key: string,
    name: string,
    betelt: boolean
}

export type Markdown = {
    type: number,
    text: string
}

export type InitialState = {
    loading: Boolean
    preview: Boolean,
    time: Time,
    result: Result,
    startTime: Date,
    endTime: Date,
    details: Details,
    detailsEn: Details,
    szakok: Szak[] | null,
    szakokEn: Szak[] | null,
    adatkezeles: Markdown[],
    adatkezelesEn: Markdown[],
    hazirend: Markdown[],
    hazirendEn: Markdown[],
    language: "hu" | "en",
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