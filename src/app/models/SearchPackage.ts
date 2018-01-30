import { Profilkriterium } from "./Profilkriterium";

export class SearchPackage {
    searchUrl: string;

    constructor(
        public namn:string, 
        public imgUrl:string, 
        public text:string, 
        public kriterier:Array<Profilkriterium>) {}
}