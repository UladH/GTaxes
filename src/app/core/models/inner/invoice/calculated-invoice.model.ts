export class CalculatedInvoiceModel{
    public date!: Date;
    public amount!: number;
    public currency!: string;
    public exchangeRate!: number;
    public convertedAmount!: number;
}