import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsRoutingModule } from './apps-routing.module';
import { AppsComponent } from './apps.component';
import {PageHeaderModule} from "../../modules/page-header/page-header.module";
import {SharedModule} from "../../helper/shared.module";
import {AppDialogModule} from "./app-dialog/app-dialog.module";


@NgModule({
  declarations: [
    AppsComponent
  ],
  imports: [
    CommonModule,
    AppsRoutingModule,
    PageHeaderModule,
    SharedModule,
    AppDialogModule
  ]
})
export class AppsModule { }
