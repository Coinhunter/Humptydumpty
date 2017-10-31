export interface Job {
    id?: number,
    arbetsgivarenamn?: string,
    rubrik?: string,
    postadressArbetsplatsNamn?: string,
    korkortList?: Korkort[],
    yrkeErfarenhet?: YrkeErfarenhet[],
    erbjudenArbetsplats?: ErbjudenArbetsplats,
    publiceringsdatum?: number,
    sistaAnsokningsdatum?: number,
    sistaPubliceringsdatum?: number,
    anstallningstyp?: Anstallningstyp,
    lonetyp?: string,
    lonebeskrivning?: string,
    antalPlatser?: number,
    organisationsnummer?: number,
    sokt?: boolean,
    annonstext?: string,
    yrkesroll?: Yrkesroll,
    ingenYrkeserfarenhetKravs?: boolean,
    egenbil?: boolean,
    referens?: string,
    tilltrade?: number,
    ansokningssattPost?: string,
    ansokningssattEpost?: string,
    ansokningssattWebbadress?: string,
    ansokningssattAnnat?: string,
    ansokningssattViaAf?: boolean,
    ovrigtOmAnsokan?: string,
    postadressUtdelningsadress?: string,
    postadressPostnummer?: string,
    postadressPostort?: string,
    postadressLand?: string,
    besoksadressGatuadress?: string,
    besoksadressOrt?: string,
    telefonnummer?: string,
    epost?: string,
    webbplats?: string,
    villkorsbeskrivning?: string,
    kontaktpersoner?: Kontaktperson[];
}

export interface Kommun {
    id: number,
    namn: string;
}

export interface ErbjudenArbetsplats {
    kommun: Kommun;
}

export interface Yrkesroll {
    id: number,
    namn: string;
}
export interface Anstallningstyp {
    id: number,
    namn: string;
}

export interface Kontaktperson {
  fornamn: string,
  efternamn: string,
  befattning: string,
  mobilnummer: string,
  telefonnummer: string,
  info: string,
  epost: string,
  facklig: boolean;
}

export interface Korkort {
  namn: string,
  varde: string
}

export interface YrkeErfarenhet {
  vikt: number,
  namn: string,
  varde: string,
  erfarenhet: Erfarenhet;
}
export interface Erfarenhet {
  namn: string,
  varde: string
}
