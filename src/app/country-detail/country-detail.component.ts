import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../model/country';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';
import { Constantes } from '../Constantes';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  private _country: Country;
  private _selectedOfficialName = 'fra';
  private _selectedDemonymTranslation ='fra';

  get country() {
    return this._country;
  }

  get selectedOfficialName() {
    return this._selectedOfficialName;
  }

  set selectedOfficialName(selectedOfficialName: string) {
    this._selectedOfficialName = selectedOfficialName;
  }

  get selectedDemonymTranslation() {
    return this._selectedDemonymTranslation;
  }

  set selectedDemonymTranslation(selectedDemonymTranslation: string) {
    this._selectedDemonymTranslation = selectedDemonymTranslation;
  }

  constructor(private searchService: SearchService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const alphaCode = this.route.snapshot.params['alpha3Code'];
    this.searchService.searchCountryByAlphaCode(alphaCode)
      .subscribe(
        country => {
          this._country = country[0];
        }
      );
  }

  public changeSelectedNameTranslation(e) {
    this._selectedOfficialName = e.value;
  }

  public changeDemonymTranslation(e) {
    this._selectedDemonymTranslation = e.value;
  }

  public translateDayOfWeekInFrench(dayOfWeek: string) {
    return Constantes.dayOfWeekToFr.get(dayOfWeek);
  }

  public joinLanguages() {
    return Object.values(this._country.languages).join(',');
  }

  public joinCurrencies() {
    let currencies ='';
    let currencyArray = Object.values(this._country.currencies);
    currencyArray.forEach((currency, i) => currencies += `${currency.name}, symbole ${currency.symbol}${i===currencyArray.length-1 ? '' : ','}`)
    return currencies;
  }

  public getCarSigns() {
    const signs = this._country.car.signs;
    return signs.length === 1 ? signs[0] : `parmi ${this._country.car.signs.join(', ')}`;
  }
}
