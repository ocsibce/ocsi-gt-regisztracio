export type GolyaAdat = {
    id: number;
    nev: string;
    email: string;
    szak: string;
    telefonszam?: string;
    cim?: string;
    nem?: "Férfi" | "Nő";
    oktatasiAzonosita?: number;
    szuletesDatum?: Date;
    szuletesHely?: string;
    poloMeret?: string;
    napok?: Napok,
    anyjaNeve?: string;
    allergia?: string | null;
    etelerzekeny?: string | null;
    egyeb?: string | null;
    regisztralt?: Date;
}

type Napok = {
    hetfo: boolean;
    kedd: boolean;
    szerda: boolean;
    csutortok: boolean;
    pentek: boolean;
}

export type Filter = {
    minId: number;
    maxId: number;
    nev: string;
    nap: Napok,
    szak: string[],
}

export type InitialState = {
    golyaLista: GolyaAdat[];
    filteredGolyaLista: GolyaAdat[];
    filters: Filter;
}