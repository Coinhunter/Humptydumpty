import { Yrke } from './Yrke.interface';
export interface Yrkesgrupp {
  id: number;
  namn: string;
  typ: string;
  yrken?: Array<Yrke>;
};
