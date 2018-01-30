import { KriteriumEgenskap } from "app/models/KriteriumEgenskap";

export class Profilkriterium {
    constructor(
        public varde:string, 
        public namn:string, 
        public typ:string, 
        public egenskaper?:Array<KriteriumEgenskap>) {}
}