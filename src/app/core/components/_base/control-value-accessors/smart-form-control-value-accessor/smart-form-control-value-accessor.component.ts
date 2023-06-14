import { ChangeDetectorRef, Component, Host, Optional, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { ISmartComponent } from 'src/app/core/interfaces/components/smart-components/smart-component.interface';
import { SmartFormControlValueAccessorService } from './smart-form-control-value-accessor.service';
import { FormControlValueAccessorComponent } from 'subform-control-value-accessor';
import { ComponentState } from 'acwrapper';

@Component({
  template: ''
})
export class SmartFormControlValueAccessorComponent<T> extends FormControlValueAccessorComponent<T> implements ISmartComponent {
  //#region constructor

  constructor(
    @Optional() @Host() @SkipSelf() controlContainer: ControlContainer,    
    protected changeDetectorRef: ChangeDetectorRef,
    protected componentService: SmartFormControlValueAccessorService<T>
  ){
    super(controlContainer);
  }
  
  //#endregion

  //#region lifecycle hooks

  public override ngOnInit(): void {
    super.ngOnInit();
    this.componentService.ngOnInit();
  }

  //#endregion

  //#region getters setters

  public get state(): ComponentState {
    return this.componentService.state;
  }

  public get form(): FormGroup {
    return this.componentService.form;
  }

  //#endregion

  //#region protected

  protected initForm(): void {
    this.componentService.initForm();
  }

  protected patchForm(value: T | null): void {
    this.componentService.patchForm(value);
  }

  protected onStateChangedHandler(): void{
    this.changeDetectorRef.markForCheck();
  }

  protected override addSubscriptions(): void{
    super.addSubscriptions();

    this.componentSubscriptions.add(
      this.componentService.stateChanged$.subscribe(this.onStateChangedHandler.bind(this))
    );
  }

  //#endregion
}
