import { InjectionToken } from "@angular/core";
import { environment } from "src/environments/environment";

//#region basic api data

export const NBG_API_DOMAIN = new InjectionToken<string>('NBG_API_DOMAIN',
  {
    providedIn: 'root',
    factory: () => environment.api.nbg.domain
  }
);

export const NBG_API_DEFAULT_HEADERS = new InjectionToken<{ [key: string]: string }>('NBG_API_DEFAULT_HEADERS',
  {
    providedIn: 'root',
    factory: () => environment.api.nbg.default_headers
  }
);

//#endregion

//#region endpoints

export const NBG_API_CURRENCIES= new InjectionToken<string>('NBG_API_CURRENCIES',
  {
    providedIn: 'root',
    factory: () => environment.api.nbg.currencies.currencies
  }
);

export const NBG_API_CURRENCIES_CODES= new InjectionToken<string>('NBG_API_CURRENCIES_CODES',
  {
    providedIn: 'root',
    factory: () => environment.api.nbg.currencies.codes
  }
);

//#endregion