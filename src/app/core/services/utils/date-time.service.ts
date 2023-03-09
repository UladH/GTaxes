import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {
  //#region constructor

  constructor() { }

  //#endregion

  //#region public

  /**
   * @privateRemarks 
   * .setDate(0) gets last day of previous month
   */
  public getPreviousMonth(date: Date): Date {
    let newDate = this.getCurrentMonth(date);
    newDate = new Date(newDate.setDate(0));

    return newDate;
  }

  public getCurrentMonth(date: Date): Date {
    let newDate = this.resetTime(date);
    newDate = new Date(new Date(newDate.setDate(1)));

    return newDate;
  }

  public getEndOfCurrentMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
  }

  public resetTime(date: Date): Date {
    return new Date(date.setHours(0, 0 ,0 ,0))
  }

  public formatDate(date: Date, format: string = 'yyyy-mm-dd'): string {
    const formatedDate = format
      .replace('yyyy', ''+date.getFullYear())
      .replace('mm', ''+date.getMonth())
      .replace('dd', ''+date.getDate());

    return formatedDate;
  }

  //#endregion
}
