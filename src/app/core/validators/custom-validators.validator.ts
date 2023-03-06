import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export class CustomValidators extends Validators {
    public static minDate(minDate: Date): ValidatorFn {
        return (control:AbstractControl) : ValidationErrors | null => {
            return control.value < minDate ? {minDate: true} : null;
        }
    }
    
    public static maxDate(maxDate: Date): ValidatorFn {
        return (control:AbstractControl) : ValidationErrors | null => {
            return control.value > maxDate ? {maxDate: true} : null;
        }
    }
}