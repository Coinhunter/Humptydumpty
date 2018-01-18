import { Profilkriterium } from "./Profilkriterium";
import { UrlparserService } from '../services/urlparser/urlparser.service';

export class SearchPackage {
    namn: string;
    imgUrl: string;
    text: string;
    kriterier: Array<Profilkriterium>;
    searchUrl: string;

    constructor(namn, imgUrl, text, kriterier) { 
        this.namn = namn;
        this.imgUrl = imgUrl;
        this.text = text;
        this.kriterier = kriterier;
    }
}