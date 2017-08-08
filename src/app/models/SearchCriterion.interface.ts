import { SearchCriterionProperty } from './SearchCriterionProperty.interface';

// Swedish domain-name: "Profilkriterium"
export interface SearchCriterion {
  varde: string;
  namn: string;
  typ: string;
  egenskaper?: Array<SearchCriterionProperty>;
}