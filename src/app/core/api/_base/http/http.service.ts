import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class HttpService {
  protected abstract apiDomain: string;
  protected abstract headers: { [key: string]: string };

  //#region constructor

  constructor(
    private http: HttpClient
  ) { }

  //#endregion

  //#region public

  public get<T>(url: string,  payload?: { [key: string]: string | boolean | number}): Observable<T> {
    const requestUrl = this.generateRequestUrl(url);
    return this.http.get<T>(requestUrl, {
      headers: this.headers,
      params: payload
    });
  }

  //#endregion

  //#region protected

  protected generateRequestUrl(url: string): string {
    return `${this.apiDomain}${url}`;
  }

  //#endregion
}
