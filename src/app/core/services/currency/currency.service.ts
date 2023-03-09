import { Inject, Injectable } from '@angular/core';
import { filter, map, Observable, ReplaySubject, take } from 'rxjs';
import { NbgCurrenciesService } from '../../api/nbg/currencies/nbg-currencies.service';
import { AVIABLE_CURRENCIES } from '../../constants/configuration/currency.constants';
import { CurrencyDatestampModel } from '../../models/inner/currency/currency-datestamp.model';
import { CurrencyModel } from '../../models/inner/currency/currency.model';
import { DateTimeService } from '../utils/date-time.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currencies: CurrencyModel[] | null = null;
  private datestamps: {[key: string]: CurrencyDatestampModel[]} = {};

  private downloadedDatestamps: string[] = [];

  private datestampsRSubject$: ReplaySubject<{[key: string]: CurrencyDatestampModel[]}> = new ReplaySubject();;
  private currenciesRSubject$: ReplaySubject<CurrencyModel[]> | null = null;

  //#region constructor

  constructor(
    private nbgCurrenciesService: NbgCurrenciesService,
    private dateTimeService : DateTimeService,
    @Inject(AVIABLE_CURRENCIES) private readonly aviableCurrencies: string[]
  ) { }

  //#endregion

  //#region events

  private get currencies$(): Observable<CurrencyModel[]> | null{
    return this.currenciesRSubject$?.asObservable() || null;
  }

  private get datestamps$(): Observable<{[key: string]: CurrencyDatestampModel[]}>{
    return this.datestampsRSubject$?.asObservable() || null;
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

  public getDatestamp$(date: Date): Observable<CurrencyDatestampModel[]> {
    const key = this.dateTimeService.formatDate(date, 'yyyy-mm-dd');

    if(!this.downloadedDatestamps.includes(key)){
      this.nbgCurrenciesService.getCurrencyDateStamp(date)
        .subscribe({
          next: (datestamps) => {
            this.datestamps[key] = datestamps;
            this.datestampsRSubject$.next(this.datestamps);
          },
          error: (error) => {
            //TODO add toastr
            this.downloadedDatestamps = this.downloadedDatestamps.filter((dateStampKey) => dateStampKey !== key);
          }
        });
      
      this.downloadedDatestamps.push(key);
    }
    
    return this.datestamps$.pipe(
      map((datestamps) => {
        return datestamps[key] || null;
      }),
      filter((datestamp) => !!datestamp),
      take(1)
    );
  }

  //#endregion
}
