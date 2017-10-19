import { Yrkesgrupp } from './Yrkesgrupp.interface';
export interface Yrkesomrade {
  id: string;
  namn: string;
  typ: string;
  yrkesgrupper?: Array<Yrkesgrupp>;
};
