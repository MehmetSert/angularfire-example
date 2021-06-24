import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {Product} from "../../models/product.model";
import {ProductService} from "../../services/product.service";
import {AppService} from "../../services/app.service";
import {SnackbarService} from "../../services/snackbar.service";
import {ProductDialogComponent} from "./product-dialog/product-dialog.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'url', 'type', 'appName', 'operation'];
  products$!: Observable<Product[]>;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private appService: AppService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.products$ = this.productService.getProducts();
  }

  openProductDialog(product?: Product): void {
    this.dialog.open(ProductDialogComponent, {
      width: '300px',
      data: product || null
    });
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId)
      .then((res: any) => {
        this.snackbarService.successSnackbar('Ürün başarıyla silindi.');
        this.appService.updateProductIdsForDeletedProduct(productId);
      })
      .catch((err: any) => {
        this.snackbarService.errorSnackbar('Ürün silinirken bir hata oluştu.');
      });
  }

}
