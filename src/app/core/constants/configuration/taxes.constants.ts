import { InjectionToken } from "@angular/core";
import { environment } from "src/environments/environment";

export const DEFAULT_TAX_PERCENTAGE = new InjectionToken<number>('DEFAULT_TAX_PERCENTAGE',
  {
    providedIn: 'root',
    factory: () => environment.taxes.defaultPercentage
  }
);