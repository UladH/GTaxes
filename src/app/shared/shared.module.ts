import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { BasicWrapperComponent } from './components/wrappers/basic-wrapper/basic-wrapper.component';



@NgModule({
  declarations: [
    BasicWrapperComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    MessageModule,
  ],
  exports: [
    BasicWrapperComponent
  ]
})
export class SharedModule { }
