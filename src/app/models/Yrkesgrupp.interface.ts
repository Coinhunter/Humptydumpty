import { Yrke } from './Yrke.interface';
export interface Yrkesgrupp {
  id: string;
  namn: string;
  typ: string;
  yrken?: Array<Yrke>;
};
