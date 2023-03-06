import { Inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { SmartFormControlValueAccessorService } from 'src/app/core/components/_base/control-value-accessors/smart-form-control-value-accessor/smart-form-control-value-accessor.service';
import { DEFAULT_CURRENCY } from 'src/app/core/constants/configuration/currency.constants';
import { ComponentState } from 'src/app/core/constants/enums/components/component-state.enum';
import { CurrencyModel } from 'src/app/core/models/inner/currency/currency.model';
import { InvoiceModel } from 'src/app/core/models/inner/invoice/invoice.model';
import { CurrencyService } from 'src/app/core/services/currency/currency.service';

@Injectable()
export class InvoiceFormService extends SmartFormControlValueAccessorService<InvoiceModel> {
  private _currencies: CurrencyModel[] | null = null;

  private onCurrenciesUpdatedSubject$: Subject<CurrencyModel[] | null> = new Subject<CurrencyModel[] | null>();

  //#region constructor

  constructor(
    private currencyService: CurrencyService,
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
      date: value?.date || new Date(),
      amount: value?.amount || 0,
      currency: value?.currency || this.defaultCurrency
    });
  }
  
  public initForm(): void {
    this.form = this.form = this.formBuilder.group({
      date: [new Date(), Validators.required],
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

  //#endregion
}
