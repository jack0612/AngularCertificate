import { CurrentConditions } from '../current-conditions/current-conditions.type';
import { Country } from './country.model';

export interface ConditionsAndZip {
    country: Country;
    zip: string;
    data: CurrentConditions;
}
