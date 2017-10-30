import { Land } from './Land.interface';

export interface Varldsdel {
  id: string;
  namn: string;
  typ: string;
  lander?: Array<Land>;
}
