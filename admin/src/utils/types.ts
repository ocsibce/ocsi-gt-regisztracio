export type GolyaAdat = {
    id: number;
    nev: string;
    email: string;
    szak: string;
    telefonszam: string;
    cim: string;
    nem: "Férfi" | "Nő";
    oktatasiAzonosito: number;
    szuletesDatum: string;
    szuletesHely: string;
    poloMeret: string;
    hetfo: boolean;
    kedd: boolean;
    szerda: boolean;
    csutortok: boolean;
    pentek: boolean;
    anyjaNeve: string;
    allergia: string | null;
    etelerzekeny: string | null;
    egyeb: string | null;
    regisztralt: number;
}

export type Filter = {
    minId: number;
    maxId: number;
    nev: string;
    nap: Napok,
    szak: string[],
    regDateKezdo: number,
    regDateUtolso: number,
}

export type InitialState = {
    golyaLista: GolyaAdat[];
    filteredGolyaLista: GolyaAdat[];
    filters: Filter;
}