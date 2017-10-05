import { Kommun } from './Kommun.interface';

export interface Lan {
  id: string;
  namn: string;
  typ: string;
  kommuner?: Array<Kommun>;
}
