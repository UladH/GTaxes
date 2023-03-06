import { InvoiceModel } from "./invoice.model";

export class MonthReportModel {
    public yearIncome!: number;
    public date!: Date;
    public invoices!: InvoiceModel[];
    public taxPercentage!: number;
}