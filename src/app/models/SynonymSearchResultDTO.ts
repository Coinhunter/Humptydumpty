import { Profilkriterium } from "./Profilkriterium";

export class SynonymSearchResultDTO {
    constructor(
        public orginalord:string, 
        public yrkesbenamningar: Array<Profilkriterium>) {}
}