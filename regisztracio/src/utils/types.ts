export type Action = {
    type: string,
    payload: any
}

export type InitialState = {
    preview: Boolean,
    time: Time,
    result: Result,
    startTime: Date,
    endTime: Date,
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