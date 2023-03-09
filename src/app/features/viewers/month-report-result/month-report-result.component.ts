import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { SmartComponentComponent } from 'src/app/core/components/_base/smart-components/smart-component/smart-component.component';
import { NATIONAL_CURRENCY } from 'src/app/core/constants/configuration/currency.constants';
import { CurrencyModel } from 'src/app/core/models/inner/currency/currency.model';
import { CalculatedInvoiceModel } from 'src/app/core/models/inner/invoice/calculated-invoice.model';
import { CalculatedMonthReportModel } from 'src/app/core/models/inner/invoice/calculated-month-report.model';
import { MonthReportModel } from 'src/app/core/models/inner/invoice/month-report.model';
import { MonthReportResultService } from './month-report-result.service';

@Component({
  selector: 'gt-month-report-result',
  templateUrl: './month-report-result.component.html',
  styleUrls: ['./month-report-result.component.scss'],
  providers: [MonthReportResultService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthReportResultComponent extends SmartComponentComponent {
  //#region constructor

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    protected override componentService: MonthReportResultService,    
    @Inject(NATIONAL_CURRENCY) protected readonly nationalCurrency: CurrencyModel,  
  ) {
    super(changeDetectorRef, componentService);
  }

  //#endregion

  //#region getters setters

  public get monthReport(): MonthReportModel | null{
    return this.componentService.monthReport;
  }

  @Input() public set monthReport(value: MonthReportModel | null) {
    this.componentService.monthReport = value;
  }

  public get calculatedMonthReport(): CalculatedMonthReportModel | null{
    return this.componentService.calculatedMonthReport;
  }  

  public get yearIncomePrevious(): number | null {
    return this.calculatedMonthReport ? this.calculatedMonthReport.yearIncomePrevious : null;
  }

  public get invoices(): CalculatedInvoiceModel[] | null {
    return this.calculatedMonthReport?.invoices || null;
  }

  public get monthIncome(): number | null {
    return this.calculatedMonthReport ? this.calculatedMonthReport.monthIncome : null;
  }
  
  public get yearIncome(): number | null {
    return this.calculatedMonthReport ? this.calculatedMonthReport.yearIncome : null;
  }

  public get taxPercentage(): number | null {
    return this.calculatedMonthReport ? this.calculatedMonthReport.taxPercentage : null;
  }

  public get tax(): number | null {
    return this.calculatedMonthReport ? this.calculatedMonthReport.tax : null;
  }
  
  //#endregion
}
