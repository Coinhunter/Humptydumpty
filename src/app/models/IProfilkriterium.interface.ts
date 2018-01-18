import { IKriteriumEgenskap } from './IKriteriumEgenskap.interface';

export interface IProfilkriterium {
  varde: string;
  namn: string;
  typ: string;
  egenskaper?: Array<IKriteriumEgenskap>;
}