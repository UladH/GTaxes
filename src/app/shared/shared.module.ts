import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    MessageModule,
  ],
  exports: [
  ]
})
export class SharedModule { }
