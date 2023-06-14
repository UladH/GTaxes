import { OnDestroy, OnInit } from "@angular/core";
import { ComponentState } from "acwrapper";

export interface ISmartComponent extends OnInit, OnDestroy {
    get state(): ComponentState;
}