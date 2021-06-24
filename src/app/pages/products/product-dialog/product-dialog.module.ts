import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDialogComponent } from './product-dialog.component';
import {SharedModule} from "../../../helper/shared.module";



@NgModule({
  declarations: [
    ProductDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProductDialogModule { }
