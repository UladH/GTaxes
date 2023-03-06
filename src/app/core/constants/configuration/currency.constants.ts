import { InjectionToken } from "@angular/core";
import { environment } from "src/environments/environment";
import { CurrencyModel } from "../../models/inner/currency/currency.model";

export const NATIONAL_CURRENCY = new InjectionToken<CurrencyModel>('NATIONAL_CURRENCY',
  {
    providedIn: 'root',
    factory: () => environment.currencies.nationalCurrency as CurrencyModel
  }
);

export const AVIABLE_CURRENCIES = new InjectionToken<string[]>('AVIABLE_CURRENCIES',
  {
    providedIn: 'root',
    factory: () => environment.currencies.aviableCurrencies
  }
);

export const DEFAULT_CURRENCY = new InjectionToken<string>('DEFAULT_CURRENCY',
  {
    providedIn: 'root',
    factory: () => environment.currencies.defaultCurrency
  }
);