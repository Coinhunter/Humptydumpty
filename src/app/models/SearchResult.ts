import { Profilkriterium } from "./Profilkriterium";

export class SearchResult {
    constructor(
        public rekryteringsbehov:Array<object>,
        public relateradeKriterier:Array<object>,
        public antalRekryteringsbehov:number,
        public antalPlatser:number,
        public antalResultatRader:number,
        public guid:string,
        public synonymSokResultat
    ) {}
}