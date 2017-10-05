import { Lan } from './Lan.interface';

export interface Land {
  id: string;
  namn: string;
  typ: string;
  lan?: Array<Lan>;
}
