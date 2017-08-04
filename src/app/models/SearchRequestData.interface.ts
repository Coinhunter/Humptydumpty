import { SearchCriterion } from './SearchCriterion.interface';

export interface SearchRequestData {
  maxAntal: number;
  startRad: number;
  matchningsprofil: Object;
  profilkriterier: Array<SearchCriterion>;
}