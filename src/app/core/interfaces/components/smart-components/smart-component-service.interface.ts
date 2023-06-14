import { OnDestroy, OnInit } from "@angular/core";
import { ComponentState } from "acwrapper";

export interface ISmartComponentService extends OnInit, OnDestroy {
    get state(): ComponentState;
}