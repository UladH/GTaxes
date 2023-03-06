import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Host, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { ControlContainer, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SmartFormControlValueAccessorComponent } from 'src/app/core/components/_base/control-value-accessors/smart-form-control-value-accessor/smart-form-control-value-accessor.component';
import { DEFAULT_CURRENCY } from 'src/app/core/constants/configuration/currency.constants';
import { CurrencyModel } from 'src/app/core/models/inner/currency/currency.model';
import { InvoiceModel } from 'src/app/core/models/inner/invoice/invoice.model';
import { InvoiceFormService } from './invoice-form.service';

const INVOICE_FORM_VALUE_ACCESSOR = {       
  provide: NG_VALUE_ACCESSOR, 
  useExisting: forwardRef(() => InvoiceFormComponent),
  multi: true     
};

const INVOICE_FORM_VALIDATORS = {
  provide: NG_VALIDATORS, 
  useExisting: forwardRef(() => InvoiceFormComponent), 
  multi: true
};

@Component({
  selector: 'gt-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
  providers: [
    INVOICE_FORM_VALUE_ACCESSOR,
    INVOICE_FORM_VALIDATORS,
    InvoiceFormService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceFormComponent extends SmartFormControlValueAccessorComponent<InvoiceModel> {
  @Input() public minDate: Date = new Date(0);
  @Input() public maxDate: Date = new Date();

  //#region constructor

  constructor(
    @Optional() @Host() @SkipSelf() controlContainer: ControlContainer,    
    changeDetectorRef: ChangeDetectorRef,
    protected override componentService: InvoiceFormService,
    @Inject(DEFAULT_CURRENCY) private readonly defaultCurrency: string
  ){
    super(controlContainer, changeDetectorRef, componentService);
  }
  
  //#endregion

  //#region getters setters

  public get currencies(): CurrencyModel[] | null{
    return this.componentService.currencies;
  }

  /**
   * @privateRemarks
   * primeng number input doesn't support nullable or empty currency code. Logic should contains code all time
   */
  public get currencyCode(): string {
    return this.componentService.currency || this.defaultCurrency;
  }

  //#endregion

  //#region protected

  protected override addSubscriptions(): void {
    super.addSubscriptions();

    this.componentSubscriptions.add(
      this.componentService.onCurrenciesUpdated$.subscribe(this.onCurrenciesUpdatedHandler.bind(this))
    );
  }

  //#endregion

  //#region private

  private onCurrenciesUpdatedHandler(currencies: CurrencyModel[] | null): void {
    this.changeDetectorRef.markForCheck();
  }
  
  //#endregion
}
