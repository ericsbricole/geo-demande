import { NativeName } from "src/native-name";

export interface CountryName {

    common: string;
    official: string;
    nativeName: { [key:string]: NativeName }
}