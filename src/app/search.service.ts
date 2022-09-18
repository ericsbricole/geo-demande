import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Country } from './model/country';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private url: string = 'https://restcountries.com/v3.1';

  constructor( private http: HttpClient ) { }

  getAllCountries(): Observable<Country[]>{
    return this.http.get<Country[]>(this.url + '/all');
  }

  searchCountryByTranslation(translationName:string):Observable<Country[]>{
    return this.http.get<Country[]>(this.url + '/translation/' + translationName);
  }

  searchCountryByAlphaCode(alphaCode:string):Observable<Country[]>{
    return this.http.get<Country[]>(this.url + '/alpha/' + alphaCode);
  }

  searchCountryByCapital(capital:string):Observable<Country[]>{
    return this.http.get<Country[]>(this.url + '/capital/' + capital);
  }

  searchCountryByLanguage(lang:string): Observable<Country[]>{
    return this.http.get<Country[]>(this.url + '/lang/' + lang);
  }

  searchCountryByReg(reg:string):Observable<Country[]>{
    return this.http.get<Country[]>(this.url + '/region/' + reg);
  }

  public requestDataFromMultipleSources(observables: Observable<Country[]>[]): Observable<Country[][]> {
    return forkJoin(observables);
  }
}
