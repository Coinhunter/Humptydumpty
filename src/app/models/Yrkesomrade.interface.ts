import { Yrkesgrupp } from './Yrkesgrupp.interface';
export interface Yrkesomrade {
  id: number;
  namn: string;
  typ: string;
  yrkesgrupper?: Array<Yrkesgrupp>;
};
