import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, debounceTime, filter, map, Subscription } from 'rxjs';
import { MonthReportModel } from 'src/app/core/models/inner/invoice/month-report.model';

@Component({
  selector: 'gt-tax-calculator',
  templateUrl: './tax-calculator.component.html',
  styleUrls: ['./tax-calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxCalculatorComponent implements OnInit, OnDestroy {
  public reportViewData: MonthReportModel | null = null;

  private _form!: FormGroup;

  private componentSubscriptions: Subscription = new Subscription();
  
  //#region constructor

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) {

  }
  //#endregion

  //#region lifecycle hooks

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      report: {invoices: []}
    });
    
    this.addSubscriptions();
  }

  public ngOnDestroy(): void {
    this.removeSubscriptions();
  }

  //#endregion

  //#region getters setters

  public get form(): FormGroup{
    return this._form;
  }

  private set form(value: FormGroup) {
    this._form = value;
  }

  //#endregion

  //#region private

  private onFormValueChangedHandler(value : {report: MonthReportModel}): void {
    this.reportViewData = value.report;
    this.changeDetectorRef.markForCheck();
  }

  private addSubscriptions(): void {
    this.componentSubscriptions.add(
      this.form.valueChanges
        .pipe(
          filter((value) => this.form.status == 'VALID')
        )
        .subscribe(this.onFormValueChangedHandler.bind(this))
    );
  }

  private removeSubscriptions(): void {
    this.componentSubscriptions.unsubscribe();
  }

  //#endregion
}
