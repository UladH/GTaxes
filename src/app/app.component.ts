import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'gt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  //#region constructor

  constructor(
    private primengConfig: PrimeNGConfig
  ){    
  }

  //#endregion

  //#region lifecycle hooks

  public ngOnInit(): void {    
    this.primengConfig.ripple = true;
  }

  //#endregion
}
