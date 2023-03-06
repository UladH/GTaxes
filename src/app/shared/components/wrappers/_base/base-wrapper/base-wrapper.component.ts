import { Component, Input } from '@angular/core';
import { ComponentState } from './enums/component-state.enum';

@Component({
  template: ''
})
export abstract class BaseWrapperComponent {
  protected readonly COMPONENT_STATE = ComponentState;

  @Input() public state: ComponentState | string = ComponentState.Empty;
  @Input() public emptyMessage: string = 'There is no data to display';
  @Input() public errorMessage: string = 'Something went wrong. Try again later';
  
  //#region constructor

  constructor(){
  }

  //#endregion

}
