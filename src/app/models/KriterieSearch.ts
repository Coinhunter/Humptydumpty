import { Profilkriterium } from "./Profilkriterium";
import { SynonymSearchResultDTO } from './SynonymSearchResultDTO';


export class KriterieSearch {
    matchningskriteriumList: Array<Profilkriterium>;
    synonymSearchResultDTO: SynonymSearchResultDTO;

    constructor(matchningskriteriumList, synonymSearchResultDTO) { 
        this.matchningskriteriumList = matchningskriteriumList;
        this.synonymSearchResultDTO = synonymSearchResultDTO;
    }
}