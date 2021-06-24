import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../models/product.model";
import {ProductService} from "../../../services/product.service";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  productForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private fb: FormBuilder,
    private productService: ProductService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.setProductForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setProductForm(): void {
    this.productForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      url: [this.data?.url || '', Validators.required],
      type: [this.data?.type || null, Validators.required],
      appId: null
    });
  }

  addProduct(): void {
    this.productService.addProduct(this.productForm.value)
      .then((res: any) => {
        this.snackbarService.successSnackbar('Ürün başarıyla eklendi.');
        this.dialogRef.close();
      })
      .catch((err: any) => {
        this.snackbarService.errorSnackbar('Ürün eklenirken bir hata oluştu.');
      });
  }

  updateProduct(): void {
    this.productService.updateProduct(this.data.id, this.productForm.value)
      .then((res: any) => {
        this.snackbarService.successSnackbar('Ürün başarıyla güncellendi.');
        this.dialogRef.close();
      })
      .catch((err: any) => {
        this.snackbarService.errorSnackbar('Ürün güncellenirken bir hata oluştu.');
      });
  }

}
