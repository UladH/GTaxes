import { Component, Host, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor } from '@angular/forms';

@Component({
  template: ''
})
export abstract class ControlValueAccessorComponent<T> implements OnInit, ControlValueAccessor {
  @Input() public errorMessages: { [key: string]: string } = {};
  @Input() public formControlName = '';
  @Input() public disabled = false;

  protected control: AbstractControl | null = null;

  protected onChangeCallback: (_: T | null) => void = () => {};
  protected onTouchedCallback: () => void = () => {};

  //#region constructor

  constructor(@Optional() @Host() @SkipSelf() protected controlContainer: ControlContainer) {}

  //#endregion

  //#region lifecycle hooks

  public ngOnInit(): void {
    if (this.controlContainer && this.controlContainer.control && this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName);
    }
  }

  //#endregion

  //#region implements ControlValueAccessor

  public writeValue(value: T): void {
    if (value !== this.data) {
      this.data = value;
    }
  }

  public registerOnChange(callback: (_: T | null) => void): void {
    this.onChangeCallback = callback;
  }

  public registerOnTouched(callback: () => void): void {
    this.onTouchedCallback = callback;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  //#endregion

  //#region getters setters

  public get value(): T | null {
    return this.data;
  }

  @Input() public set value(newValue: T | null) {
    this.data = newValue;
    this.onChangeCallback(this.data);
  }

  public get isValid(): boolean {
    return !this.control || !this.control.errors || !Object.keys(this.control.errors).length;
  }

  /**
   * @description
   * getter is used for displaying all active errors inside component 
   */
  public get activeErrorMessages(): string[] {
    return this.getErrorsMessages();
  }
  
  /**
   * @description
   * internal getter and setter for control value. Method "writeValue" doesn't use public getter/setter,
   * because we don't trigger onChange event and we need additional getter/setter for overriding
   */
  protected abstract get data(): T | null;

  protected abstract set data(value : T | null);

  //#endregion

  //#region protected

  protected getErrorsMessages(): string[] {
    const errors: string[] = [];

    if (this.isValid) {
      return errors;
    }

    Object.keys(this.control!.errors!).forEach((errorName: string) => {
      if (!this.errorMessages[errorName]) {
        return;
      }

      errors.push(this.errorMessages[errorName] as string);
    });

    return errors;
  }

  //#endregion
}
