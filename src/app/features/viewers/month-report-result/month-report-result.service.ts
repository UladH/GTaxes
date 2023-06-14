import { Injectable } from '@angular/core';
import { ComponentState } from 'acwrapper';
import { combineLatest, map, Observable, take } from 'rxjs';
import { SmartComponentService } from 'src/app/core/components/_base/smart-components/smart-component/smart-component.service';
import { CalculatedInvoiceModel } from 'src/app/core/models/inner/invoice/calculated-invoice.model';
import { CalculatedMonthReportModel } from 'src/app/core/models/inner/invoice/calculated-month-report.model';
import { MonthReportModel } from 'src/app/core/models/inner/invoice/month-report.model';
import { CurrencyService } from 'src/app/core/services/currency/currency.service';

@Injectable()
export class MonthReportResultService extends SmartComponentService {
  private _monthReport: MonthReportModel | null = null;
  private _calculatedMonthReport: CalculatedMonthReportModel | null = null;
  
  //#region constructor

  constructor(
    private currencyService: CurrencyService
  ) {
    super();
   }

  //#endregion

  //#region getters setters

  public get monthReport(): MonthReportModel | null{
    return this._monthReport;
  }

  public set monthReport(value: MonthReportModel | null) {
    this._monthReport = value;
    this.calculateReport();
  }

  public get calculatedMonthReport(): CalculatedMonthReportModel | null{
    return this._calculatedMonthReport;
  }

  public set calculatedMonthReport(value: CalculatedMonthReportModel | null) {
    this._calculatedMonthReport = value;
  }

  //#endregion

  //#region private

  private calculateReport(): void {
    const datestamps$: Observable<CalculatedInvoiceModel>[] = [];
    const monthReport = this.monthReport;

    if(!monthReport) {
      this.calculatedMonthReport = null;
      this.state = ComponentState.Empty;
      return;
    }

    this.state = ComponentState.Loader;

    monthReport.invoices.forEach((invoice) =>{      
      datestamps$.push(
        this.currencyService.getDatestamp$(invoice.date).pipe(
          map((datestamps) =>{
            const datestamp = datestamps.find((datestamp) => datestamp.code === invoice.currency)!;

            return {
              date: invoice.date,
              amount: invoice.amount,
              currency: invoice.currency,
              exchangeRate: datestamp.rate,
              convertedAmount: Math.ceil(invoice.amount * datestamp.rate * 100) / 100
            } as CalculatedInvoiceModel
          })
        )
      );
    });

    combineLatest(datestamps$).pipe(take(1)).subscribe((invoices: CalculatedInvoiceModel[]) =>{
      const monthIncome = invoices.reduce((amount, invoice) => amount + invoice.convertedAmount, 0);
      const yearIncome = monthReport.yearIncome + monthIncome;
      const tax = Math.ceil(monthIncome * monthReport.taxPercentage) / 100;

      this.calculatedMonthReport = {
        yearIncomePrevious: monthReport.yearIncome,
        date: monthReport.date,
        invoices: invoices,
        taxPercentage: monthReport.taxPercentage,
        monthIncome: monthIncome,
        yearIncome: yearIncome,
        tax: tax
      }

      this.state = ComponentState.Content;
    });
  }

  //#endregion
}
