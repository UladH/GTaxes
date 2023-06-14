import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Host, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DEFAULT_CURRENCY, NATIONAL_CURRENCY } from 'src/app/core/constants/configuration/currency.constants';
import { DEFAULT_TAX_PERCENTAGE } from 'src/app/core/constants/configuration/taxes.constants';
import { CurrencyModel } from 'src/app/core/models/inner/currency/currency.model';
import { InvoiceModel } from 'src/app/core/models/inner/invoice/invoice.model';
import { MonthReportModel } from 'src/app/core/models/inner/invoice/month-report.model';
import { DateTimeService } from 'src/app/core/services/utils/date-time.service';
import { CustomValidators } from 'src/app/core/validators/custom-validators.validator';
import { FormControlValueAccessorComponent } from 'subform-control-value-accessor';

const MONTH_REPORT_FORM_VALUE_ACCESSOR = {       
  provide: NG_VALUE_ACCESSOR, 
  useExisting: forwardRef(() => MonthReportFormComponent),
  multi: true     
};

const MONTH_REPORT_FORM_VALIDATORS = {
  provide: NG_VALIDATORS, 
  useExisting: forwardRef(() => MonthReportFormComponent), 
  multi: true
};

@Component({
  selector: 'gt-month-report-form',
  templateUrl: './month-report-form.component.html',
  styleUrls: ['./month-report-form.component.scss'],
  providers: [ MONTH_REPORT_FORM_VALUE_ACCESSOR, MONTH_REPORT_FORM_VALIDATORS ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthReportFormComponent extends FormControlValueAccessorComponent<MonthReportModel> {  
  @Input() public minDate: Date = new Date(0);
  @Input() public maxDate: Date = new Date();

  private _form!: FormGroup;
  
  //#region constructor

  constructor(
    @Optional() @Host() @SkipSelf() controlContainer: ControlContainer,    
    private formBuilder: FormBuilder,    
    private changeDetectorRef: ChangeDetectorRef,
    private dateTimeService: DateTimeService,
    @Inject(DEFAULT_CURRENCY) private readonly defaultCurrency: string,    
    @Inject(NATIONAL_CURRENCY) private readonly nationalCurrency: CurrencyModel,
    @Inject(DEFAULT_TAX_PERCENTAGE) private readonly defaultTaxPercentage: number
  ){
    super(controlContainer);
  }

  //#endregion

  //#region getters setters

  public get form(): FormGroup {
    return this._form;
  }

  private set form(value: FormGroup) {
    this._form = value;
  }

  public get invoices() : FormArray {
    return this.form.get("invoices") as FormArray
  }

  public get minInvoiceDate(): Date {
    return this.form?.value.date || new Date(0);
  }

  public get maxInvoiceDate(): Date {
    const currentTime = new Date();

    if(!this.form?.value.date){
      return currentTime;
    }

    const maxDate = this.dateTimeService.getEndOfCurrentMonth(this.form.value.date);

    return maxDate > currentTime ? currentTime : maxDate;
  }

  public get nationaCurrencyCode(): string {
    return this.nationalCurrency.code;
  }

  //#endregion

  //#region protected

  protected addInvoice(): void{
    const date = this.dateTimeService.getCurrentMonth(new Date()).getTime() === this.dateTimeService.getCurrentMonth(this.minInvoiceDate).getTime() ? 
      new Date() : this.minInvoiceDate;
    this.invoices.push(this.generateInvoiceControl(date));

    this.changeDetectorRef.detectChanges();
  }

  protected removeInvoice(index: number): void{
    this.invoices.removeAt(index);
    
    this.changeDetectorRef.detectChanges();
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      yearIncome: [0, [CustomValidators.required, CustomValidators.min(0)]],
      date: [this.dateTimeService.getCurrentMonth(new Date()), CustomValidators.required],
      taxPercentage: [this.defaultTaxPercentage, [CustomValidators.required, CustomValidators.min(0), CustomValidators.max(100)]],
      invoices: this.formBuilder.array([this.generateInvoiceControl()])
    });
  }

  protected patchForm(value: MonthReportModel | null): void {
    this.form.patchValue({
      yearIncome: value?.yearIncome || 0,
      date: value?.date || this.dateTimeService.getCurrentMonth(new Date()),
      taxPercentage: value?.taxPercentage || this.defaultTaxPercentage,
      invoices: value?.invoices || this.formBuilder.array([this.generateInvoiceControl(this.minInvoiceDate)])
    });
  }

  //#endregion

  //#region private

  private generateInvoiceControl(date: Date = new Date()): FormControl{
    return this.formBuilder.control({
      date: date,
      amount: 0,
      currency: this.defaultCurrency
    } as InvoiceModel);
  }

  //#endregion
}
