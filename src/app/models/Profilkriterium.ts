import { IProfilkriterium } from '../models/IProfilkriterium.interface';

export class Profilkriterium implements IProfilkriterium {
    varde: string;
    namn: string;
    typ: string;

    constructor(varde, namn, typ) { 
        this.varde = varde;
        this.namn = namn;
        this.typ = typ;
    }
}