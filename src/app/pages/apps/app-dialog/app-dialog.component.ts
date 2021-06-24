import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Product} from "../../../models/product.model";
import {App} from "../../../models/app.model";
import {AppService} from "../../../services/app.service";
import {ProductService} from "../../../services/product.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {ProductDialogComponent} from "../../products/product-dialog/product-dialog.component";

@Component({
  selector: 'app-app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.scss']
})
export class AppDialogComponent implements OnInit {

  appForm!: FormGroup;
  products$!: Observable<Product[]>;

  constructor(
    public dialogRef: MatDialogRef<AppDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: App,
    private fb: FormBuilder,
    private appService: AppService,
    private productService: ProductService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.setAppForm();
  }

  getProducts(): void {
    this.products$ = this.productService.getSelectableProductsForApps(this.data?.id);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setAppForm(): void {
    this.appForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      productIds: [this.data?.productIds || []]
    });
  }

  addApp(): void {
    this.appService.addApp(this.appForm.value)
      .then((res: any) => {
        this.snackbarService.successSnackbar('Uygulama başarıyla eklendi.');

        if (this.appForm.get('productIds')?.value) {
          this.updateAppIdsSelectedProducts(res.id);
        }

        this.dialogRef.close();
      })
      .catch((err: any) => {
        this.snackbarService.errorSnackbar('Uygulama eklenirken bir hata oluştu.');
      });
  }

  updateApp(): void {
    this.appService.updateApp(this.data.id, this.appForm.value)
      .then((res: any) => {
        this.snackbarService.successSnackbar('Uygulama başarıyla güncellendi.');

        if (this.appForm.get('productIds')?.value) {
          this.updateAppIdsSelectedProducts(this.data.id);
        }

        this.dialogRef.close();
      })
      .catch((err: any) => {
        this.snackbarService.errorSnackbar('Uygulama güncellenirken bir hata oluştu.');
      });
  }

  // Seçili ürünlerin appId fieldlarını güncelle
  updateAppIdsSelectedProducts(appId: string): void {
    this.productService.updateAppIdsOfSelectedProducts(this.appForm.get('productIds')?.value, appId);
  }

  openProductDialog(): void {
    this.dialog.open(ProductDialogComponent, {
      width: '300px'
    });
  }

}
