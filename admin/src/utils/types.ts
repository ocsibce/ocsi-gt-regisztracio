export type GolyaAdat = {
    id: number;
    nev: string;
    email: string;
    szak: string;
    telefonszam: string;
    cim: string;
    nem: "Férfi" | "Nő";
    oktatasiAzonosito: number;
    szuletesiDatum: string;
    szuletesiHely: string;
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
    regisztracioDatuma: number;
}

export type Filter = {
    minId: number;
    maxId: number;
    nev: string;
    hetfo: boolean;
    kedd: boolean;
    szerda: boolean;
    csutortok: boolean;
    pentek: boolean;
    szak: string[];
    regDateKezdo: number;
    regDateUtolso: number;
}

export type InitialState = {
    golyaLista: GolyaAdat[];
    filteredGolyaLista: GolyaAdat[];
    filters: Filter;
    settings: SettingsData[];
    editing: SettingsData | null,
    savingSettings: boolean;
}

export type Szak = {
    key: string,
    name: string,
    betelt: boolean
};

export type Markdown = {
    text: string;
    type: MarkdownType
}

export enum MarkdownType {
    "paragraph",
    "heading"
}

export type SettingsData = {
    id?: number,
    ev: string,
    nev: string,
    start_date: number,
    end_date: number,
    reszletek: {
        regisztracioMenete: string[],
        fontosInformaciok: string[]
    },
    reszletek_en?: {
        regisztracioMenete: string[],
        fontosInformaciok: string[]
    },
    szakok: Szak[],
    szakok_en?: Szak[],
    adatkezeles: Markdown[],
    adatkezeles_en?: Markdown[],
    hazirend: Markdown[],
    hazirend_en?: Markdown[],
    banner_link?: string,
    eles: "0" | "1",
    preview: "0" | "1"
}