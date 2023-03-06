import { OnDestroy, OnInit } from "@angular/core";
import { ComponentState } from "src/app/core/constants/enums/components/component-state.enum";

export interface ISmartComponentService extends OnInit, OnDestroy {
    get state(): ComponentState;
}