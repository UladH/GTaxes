import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NBG_API_DEFAULT_HEADERS, NBG_API_DOMAIN } from 'src/app/core/constants/configuration/nbg.constants';
import { HttpService } from '../../_base/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class NbgHttpService extends HttpService {
  //#region constructor

  constructor (
    http: HttpClient, 
    @Inject(NBG_API_DOMAIN) protected apiDomain: string,
    @Inject(NBG_API_DEFAULT_HEADERS) protected headers: { [key: string]: string }
  ) { 
    super(http);
  }

  //#endregion
}
