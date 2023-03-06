import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseWrapperComponent } from '../_base/base-wrapper/base-wrapper.component';

@Component({
  selector: 'gt-basic-wrapper',
  templateUrl: './basic-wrapper.component.html',
  styleUrls: ['./basic-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicWrapperComponent extends BaseWrapperComponent {
  //#region constructor

  constructor() {
    super();
  }

  //#endregion
}
