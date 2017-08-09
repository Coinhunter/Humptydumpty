import { KriteriumEgenskap } from './KriteriumEgenskap.interface';

export interface Profilkriterium {
  varde: string;
  namn: string;
  typ: string;
  egenskaper?: Array<KriteriumEgenskap>;
}