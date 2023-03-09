import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tax-calculator',
    loadChildren: () => import('./pages/tax-calculator/tax-calculator.module').then((m) => m.TaxCalculatorModule),
  },
  {
    path: '',
    redirectTo: '/tax-calculator',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/tax-calculator',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
