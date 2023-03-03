import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NATIONAL_CURRENCY } from 'src/app/core/constants/configuration/currency.constants';
import { NBG_API_CURRENCIES_CODES } from 'src/app/core/constants/configuration/nbg.constants';
import { MapperService } from 'src/app/core/mappers/mapper.service';
import { CurrencyModel } from 'src/app/core/models/inner/currency/currency.model';
import { CurrencyInputModel } from 'src/app/core/models/input/currency/currency-input.model';
import { NbgHttpService } from '../_http/nbg-http.service';

@Injectable({
  providedIn: 'root'
})
export class NbgCurrenciesService {
  //#region constructor

  constructor(
    private http: NbgHttpService,
    private mapper: MapperService,
    @Inject(NATIONAL_CURRENCY) private readonly nationalCurrency: CurrencyModel,
    @Inject(NBG_API_CURRENCIES_CODES) private readonly apiUrlCodes: string
  ) { }

  //#endregion

  //#region public

  public getCurrencies(): Observable<CurrencyModel[]>{
    const url = this.apiUrlCodes;

    return this.http.get<CurrencyInputModel[]>(url).pipe(
      map((currencyDatestamps) => {
        let currencies = this.mapper.mapArray(currencyDatestamps, CurrencyInputModel, CurrencyModel);
        currencies.push({...this.nationalCurrency});
        currencies = currencies.sort((currency, nextCurrency)=> {
          if (currency.name.toLowerCase() < nextCurrency.name.toLowerCase()) {
            return -1;
          }
          if (currency.name.toLowerCase() > nextCurrency.name.toLowerCase()) {
              return 1;
          }
          return 0;
          })
        return currencies
      })
    )
  }

  //#endregion
}
