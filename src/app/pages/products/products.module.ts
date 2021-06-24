import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import {PageHeaderModule} from "../../modules/page-header/page-header.module";
import {SharedModule} from "../../helper/shared.module";
import {ProductDialogModule} from "./product-dialog/product-dialog.module";
import {AppNamePipe} from "../../pipes/app-name.pipe";


@NgModule({
  declarations: [
    ProductsComponent,
    AppNamePipe
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PageHeaderModule,
    SharedModule,
    ProductDialogModule
  ]
})
export class ProductsModule { }
