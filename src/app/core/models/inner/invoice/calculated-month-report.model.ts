import { CalculatedInvoiceModel } from "./calculated-invoice.model";

export class CalculatedMonthReportModel {
    public yearIncomePrevious!: number;
    public date!: Date;
    public invoices!: CalculatedInvoiceModel[];
    public taxPercentage!: number;
    public monthIncome!: number;
    public yearIncome!: number;
    public tax!: number;
}