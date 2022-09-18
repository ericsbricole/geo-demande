import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { SearchService } from "../search.service";
import { Country } from '../model/country';
import { Observable } from 'rxjs';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private _cForm: UntypedFormGroup;
  private _selectedAlpha3Code: string;

  get cForm() {
    return this._cForm;
  }

  private _countries: Country[] = [];

  private _responses: Country[][];
  private _searched: boolean = false;

  get countries() {
    return this._countries;
  }

  get responses() {
    return this._responses;
  }

  get searched() {
    return this._searched;
  }

  constructor(private searchService: SearchService,
    private formBuilder: UntypedFormBuilder) { }

  ngOnInit() {
    this.initForm();
  }


  private initForm(): void {
    this._cForm = this.formBuilder.group({
      inpCode: '',
      inpTranslation: '',
      inpLang: '',
      inpCall: '',
      inpReg: '',
      inpRegBloc: '',
      inpCapital: '',
    });
  }

  research(event): void {
    this._searched = true;
    const formValue = this._cForm.value;
    const code: string = formValue['inpCode'];
    const translation: string = formValue['inpTranslation'];
    const lang: string = formValue['inpLang'];
    const reg: string = formValue['inpReg'] === 'Ne pas filtrer' ? '' : formValue['inpReg'];
    const capital: string = formValue['inpCapital'];

    this._countries = [];
    let obsToRequest: Observable<Country[]>[] = [];

    if (code.trim() !== '') {
      obsToRequest.push(this.searchService.searchCountryByAlphaCode(code));
    }
      if (translation.trim() !== '') {
        obsToRequest.push(this.searchService.searchCountryByTranslation(translation));
      }
      if (reg !== '') {
        obsToRequest.push(this.searchService.searchCountryByReg(reg));
      }
      if (capital !== '') {
        obsToRequest.push(this.searchService.searchCountryByCapital(capital));
      }
      if (lang !== '') {
        obsToRequest.push(this.searchService.searchCountryByLanguage(lang));
      }

    if (obsToRequest.length > 0) {
        this.searchService.requestDataFromMultipleSources(obsToRequest)
        .subscribe(
          countries => { this._responses = countries; console.log('a trouvé de multiples sources:'); console.log(countries)},
          error => {console.log('encore un peu: '); console.error(error)},
          () => {
            this.findSelectedByUser();
          }
        );
    }
  }

  findSelectedByUser(): void {
    let countIterationsOfCountries = {};
    this._responses.forEach((countriesFound) => {
      countriesFound.forEach((countryFound) => {
        countryFound.name.common in countIterationsOfCountries ? countIterationsOfCountries[countryFound.name.common]++ : countIterationsOfCountries[countryFound.name.common] = 1;
      })
    }); // at this point, countIterationsOfCountries knows how many times we have found each country

    const hits = Object.values(countIterationsOfCountries);
    const max = Math.max.apply(null, hits);

    //we loop responses again to push countries found in each list, thus selected by each user-defined filters
    this._responses.forEach(countriesFound => {
      countriesFound.forEach((countryFound) => {
        if (countIterationsOfCountries[countryFound.name.common] === this._responses.length && this.canPushInCountries(countryFound)) {
            this._countries.push(countryFound);
          }
      })
    });
  }

  canPushInCountries(newCountry: Country): boolean {
    const newName = newCountry.name.common;
    return this._countries.find(country => country.name.common === newName) === undefined;
  }


  getAllCountries() {
    this.searchService.getAllCountries()
      .subscribe(
        countries => this._countries = countries,
        error => console.error("an error occured hile getting countries " + error)
      );
  }

  searchCountries(criteria: string) {
    this.searchService.searchCountryByTranslation(criteria)
      .subscribe(
        countries => this._countries = countries,
        error => console.error(`an error occured hile getting countries: ${error}`)
      );
  }

  public updateSelectedA3C(alpha3Code: string) {
    this._selectedAlpha3Code = alpha3Code;
  }


  get selectedAlpha3Code () {
    return this._selectedAlpha3Code;
  }
}
