import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDialogComponent } from './app-dialog.component';
import {SharedModule} from "../../../helper/shared.module";
import {MatProgressBarModule} from "@angular/material/progress-bar";



@NgModule({
  declarations: [
    AppDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressBarModule
  ]
})
export class AppDialogModule { }
