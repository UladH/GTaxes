import { Inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { SmartFormControlValueAccessorService } from 'src/app/core/components/_base/control-value-accessors/smart-form-control-value-accessor/smart-form-control-value-accessor.service';
import { DEFAULT_CURRENCY } from 'src/app/core/constants/configuration/currency.constants';
import { ComponentState } from 'src/app/core/constants/enums/components/component-state.enum';
import { CurrencyModel } from 'src/app/core/models/inner/currency/currency.model';
import { InvoiceModel } from 'src/app/core/models/inner/invoice/invoice.model';
import { CurrencyService } from 'src/app/core/services/currency/currency.service';
import { DateTimeService } from 'src/app/core/services/utils/date-time.service';
import { CustomValidators } from 'src/app/core/validators/custom-validators.validator';

@Injectable()
export class InvoiceFormService extends SmartFormControlValueAccessorService<InvoiceModel> {
  private _minDate: Date = new Date(0);
  private _maxDate: Date = new Date();
  private _currencies: CurrencyModel[] | null = null;

  private onCurrenciesUpdatedSubject$: Subject<CurrencyModel[] | null> = new Subject<CurrencyModel[] | null>();

  //#region constructor

  constructor(
    private currencyService: CurrencyService,
    private dateTimeService: DateTimeService,
    private formBuilder: FormBuilder,
    @Inject(DEFAULT_CURRENCY) private readonly defaultCurrency: string
  ) {
    super();
  }

  //#endregion

  //#region lifecycle hooks

  public override ngOnInit(): void {
    this.state = ComponentState.Loader;

    super.ngOnInit();
  }

  //#endregion

  //#region getters setters
  
  public get minDate(): Date{
    return this._minDate;
  }

  public set minDate(value: Date) {
    this._minDate = value;

    this.updateValidators();
  }

  public get maxDate(): Date{
    return this._maxDate;
  }

  public set maxDate(value: Date) {
    this._maxDate = value;

    this.updateValidators();
  }

  public get currency(): string | null{
    return this.form?.value.currency || null;
  }

  public get currencies(): CurrencyModel[] | null{
    return this._currencies;
  }

  private set currencies(value: CurrencyModel[] | null) {
    this._currencies = value;    
    this.onCurrenciesUpdatedSubject$.next(value);
  }

  //#endregion  

  //#region events

  public get onCurrenciesUpdated$(): Observable<CurrencyModel[] | null> {
    return this.onCurrenciesUpdatedSubject$.asObservable();
  }

  //#endregion

  //#region public  

  public patchForm(value: InvoiceModel | null): void {
    this.form.patchValue({
      date: value?.date || this.dateTimeService.resetTime(new Date()),
      amount: value?.amount || 0,
      currency: value?.currency || this.defaultCurrency
    });
  }
  
  public initForm(): void {
    this.form = this.form = this.formBuilder.group({
      date: [this.dateTimeService.resetTime(new Date()), [Validators.required, CustomValidators.minDate(this.minDate), CustomValidators.maxDate(this.maxDate)]],
      amount: [0, [Validators.required, Validators.min(0)]],
      currency: [this.defaultCurrency, Validators.required]
    });
  }

  //#endregion

  //#region protected

  protected override addSubscriptions(): void {
    super.addSubscriptions();

    this.serviceSubscription.add(
      this.currencyService.getCurrencies$().subscribe({
        next: this.onCurrenciesUpdatedHandler.bind(this),
        error: (error) =>{
          this.state = ComponentState.Error;
        }
      })
    );
  }

  //#endregion

  //#region private

  private onCurrenciesUpdatedHandler(currencies: CurrencyModel[]): void {
    this.currencies = currencies;
    this.state = ComponentState.Content;
  }
  
  private updateValidators(): void{
    this.form?.get('date')?.setValidators([Validators.required, CustomValidators.minDate(this.minDate), CustomValidators.maxDate(this.maxDate)]);
    this.form?.get('date')?.updateValueAndValidity();
  }

  //#endregion
}
