import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable, Subject, Subscription } from "rxjs";
import { ComponentState } from "src/app/core/constants/enums/components/component-state.enum";
import { ISmartComponentService } from "src/app/core/interfaces/components/smart-components/smart-component-service.interface";



@Injectable({
  providedIn: 'root'
})
export abstract class SmartFormControlValueAccessorService<T> implements ISmartComponentService {
  protected _form!: FormGroup;
  protected _state: ComponentState = ComponentState.Content;

  protected stateChangedSubject$: Subject<ComponentState> = new Subject<ComponentState>();

  protected serviceSubscription: Subscription = new Subscription();

  //#region constructor

  constructor() { }

  //#endregion

  //#region lifecycle hooks

  /**
   * @description
   * Angular doesn't trigger ngOnInit for services, but there is a troubles with initialization extended classes with constructor,
   * so we trigger this method manually from component
   */
  public ngOnInit(): void {
    this.addSubscriptions();
  }

  public ngOnDestroy(): void {
    this.removeSubscriptions();
  }

  //#endregion

  //#region getters setters

  public get form(): FormGroup {
    return this._form;
  }

  protected set form(value: FormGroup) {
    this._form = value;
  } 
  
  public get state(): ComponentState {
    return this._state;
  }

  protected set state(value: ComponentState) {
    this._state = value;
    this.stateChangedSubject$.next(this.state);
  }

  //#endregion

  //#region events

  public get stateChanged$(): Observable<ComponentState>{
    return this.stateChangedSubject$.asObservable();
  }

  //#endregion

  //#region public  

  public abstract patchForm(value: T | null): FormGroup;
  
  public abstract initForm(): FormGroup;

  //#endregion

  //#region protected

  protected addSubscriptions(): void{
  }

  protected removeSubscriptions(): void{
    this.serviceSubscription.unsubscribe();
  }

  //#endregion
}