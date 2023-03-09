import { AfterViewInit, Component, Host, OnDestroy, Optional, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ControlValueAccessorComponent } from '../control-value-accessor/control-value-accessor.component';

@Component({
  template: ''
})
export abstract class FormControlValueAccessorComponent<T> extends ControlValueAccessorComponent<T> implements AfterViewInit, OnDestroy, Validator {
  protected componentSubscriptions: Subscription = new Subscription();

  //#region constructor

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer){
    super(controlContainer);
  }
  
  //#endregion

  //#region lifecycle hooks

  public override ngOnInit(): void {
    super.ngOnInit();

    this.initForm();
    this.addSubscriptions();
  }

  public ngOnDestroy(): void {
    this.removeSubscriptions();
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      this.onChangeCallback(this.value);
    })
  }

  //#endregion

  //#region implements Validator
  
  public validate(control?: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : { form: true };
  }

  //#endregion

  //#region getters setters  
  
  public abstract get form(): FormGroup;

  public override set data(value: T | null) {
    this.patchForm(value);
  }

  public override get data(): T | null {
    return this.form.value;
  }

  //#endregion

  //#region protected
  
  protected abstract initForm(): void;

  protected abstract patchForm(value: T | null): void;

  protected onFormValueChangedHandler(value: T | null): void{
    this.onChangeCallback(value);
  }

  protected addSubscriptions(): void {
    this.componentSubscriptions.add(
      this.form.valueChanges.subscribe(this.onFormValueChangedHandler.bind(this))
    );
  }

  protected removeSubscriptions(): void {
    this.componentSubscriptions.unsubscribe();
  }

  //#endregion
}
