import { Currency } from './currency';
import { Translations } from './translations';
import { Language } from './language';
import { CountryName } from './country-name'

export class Country {
    name: CountryName;
    tld: string; // topLevelDomain
    cca2: string;
    ccn3: string;
    cca3: string;
    cioc: string;
    independent: boolean;
    status: string;
    unMember: boolean;
    currencies: { [key: string]: Currency };
    capital: string[];
    altSpellings: string[];
    region: string;
    subregion: string;
    languages: {[key:string]: string};
    translations: Translations;
    latlng: number[];
    landlocked: boolean;
    borders: string[];
    area: number;
    demonyms: {[key: string]: {f: string, m: string}}
    flag: string;
    maps: {[key: string]: string};
    population: number;
    gini: {[key: string]: number};
    fifa: string;
    car: {signs: string[], side: 'string'}
    timezones: string[];
    continents: string[];
    flags: {png: string, svg: string};
    coatOfArms: {png: string, svg: string};
    startOfWeek: string;
    capitalInfo: {latlng: number[]};
    postalCode: {format: string, regex:string }

    constructor(obj?: any) {
      Object.assign(this, obj);
    }
  }
  