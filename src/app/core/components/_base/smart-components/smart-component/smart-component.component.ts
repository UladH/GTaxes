import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISmartComponent } from 'src/app/core/interfaces/components/smart-components/smart-component.interface';
import { SmartComponentService } from './smart-component.service';
import { ComponentState } from 'acwrapper';

@Component({
  template:''
})
export abstract class SmartComponentComponent implements ISmartComponent {
  protected componentSubscriptions: Subscription = new Subscription();
  
  //#region constructor

  constructor(   
    protected changeDetectorRef: ChangeDetectorRef,
    protected componentService: SmartComponentService
  ){
  }
  
  //#endregion

  //#region lifecycle hooks

  public ngOnInit(): void {
    this.componentService.ngOnInit();
    this.addSubscriptions();
  }

  public ngOnDestroy(): void {
    this.removeSubscriptions();
  }

  //#endregion

  //#region getters setters

  public get state(): ComponentState {
    return this.componentService.state;
  }

  //#endregion

  //#region protected

  protected onStateChangedHandler(): void{
    this.changeDetectorRef.markForCheck();
  }

  protected addSubscriptions(): void{
    this.componentSubscriptions.add(
      this.componentService.stateChanged$.subscribe(this.onStateChangedHandler.bind(this))
    );
  }

  protected removeSubscriptions(): void {
    this.componentSubscriptions.unsubscribe();
  }

  //#endregion
}
