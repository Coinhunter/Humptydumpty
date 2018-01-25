import { Profilkriterium } from "./Profilkriterium";

export class SynonymSearchResultDTO {
    orginalord: string;
    yrkesbenamningar: Array<Profilkriterium>;

    constructor(orginalord, yrkesbenamningar) { 
        this.orginalord = orginalord;
        this.yrkesbenamningar = yrkesbenamningar;
    }
}