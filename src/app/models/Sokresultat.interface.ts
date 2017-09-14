import { RelateratKriterium } from './RelateratKriterium.interface';

export interface Sokresultat {
  rekryteringsbehov: any[];
  relateradeKriterier: Array<RelateratKriterium>;
  antalRekryteringsbehov: number;
  antalRekryteringsbehovMatcharExakt: number;
  antalRekryteringsbehovMatcharDelvis: number;
  antalPlatser: number;
  antalResultatRader: number;
  guid: string;
}
