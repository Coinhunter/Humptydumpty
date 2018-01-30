import { Profilkriterium } from "./Profilkriterium";
import { SynonymSearchResultDTO } from './SynonymSearchResultDTO';


export class KriterieSearch {
    constructor(
        public matchningskriteriumList: Array<Profilkriterium>, 
        public synonymSearchResultDTO: SynonymSearchResultDTO) {}
}