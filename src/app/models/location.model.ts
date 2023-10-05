import { Country } from "./country.model";

export interface ILocation {
    country: Country;
    zipcode: string;
}