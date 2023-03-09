import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaxCalculatorComponent } from "./tax-calculator.component";

const routes: Routes = [
    {
      path: '',
      component: TaxCalculatorComponent,
    },
  ];
  
  @NgModule({
    imports: [
        RouterModule.forChild(routes), 
        CommonModule
    ],
    exports: [RouterModule],
  })
  export class TaxCalculatorRoutingModule {}