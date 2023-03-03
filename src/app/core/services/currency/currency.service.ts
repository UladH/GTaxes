import { Inject, Injectable } from '@angular/core';
import { map, Observable, ReplaySubject } from 'rxjs';
import { NbgCurrenciesService } from '../../api/nbg/currencies/nbg-currencies.service';
import { AVIABLE_CURRENCIES } from '../../constants/configuration/currency.constants';
import { CurrencyModel } from '../../models/inner/currency/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currencies: CurrencyModel[] | null = null;

  private currenciesRSubject$: ReplaySubject<CurrencyModel[]> | null = null;

  //#region constructor

  constructor(
    private nbgCurrenciesService: NbgCurrenciesService,
    @Inject(AVIABLE_CURRENCIES) private readonly aviableCurrencies: string[]
  ) { }

  //#endregion

  //#region events

  private get currencies$(): Observable<CurrencyModel[]> | null{
    return this.currenciesRSubject$?.asObservable() || null;
  }

  //#endregion

  //#region public

  public getCurrencies$(): Observable<CurrencyModel[]> {
    if(this.currencies$){
      return this.currencies$;
    }

    this.currenciesRSubject$ = new ReplaySubject<CurrencyModel[]>();

    this.nbgCurrenciesService.getCurrencies()
      .pipe(
        map((currencies) => {
          return currencies.filter((currency) =>{
            return this.aviableCurrencies.includes(currency.code)
          });
        })
      )
      .subscribe({
        next: (currencies) => {
          this.currencies = currencies;
          this.currenciesRSubject$?.next(this.currencies);
        },
        error: (error) => {
          //TODO
          //add toastr
          console.error(error);
        }
      });

    return this.currencies$!;
  }

  //#endregion
}
