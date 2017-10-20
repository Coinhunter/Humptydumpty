import { KriteriumEgenskap } from './KriteriumEgenskap.interface';

export interface Fritextsokresultat {
  id: string;
  namn: string;
  typ: string;
  egenskaper?: Array<KriteriumEgenskap>;
}
