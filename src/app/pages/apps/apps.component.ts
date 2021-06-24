import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AppService} from "../../services/app.service";
import {ProductService} from "../../services/product.service";
import {SnackbarService} from "../../services/snackbar.service";
import {Observable} from "rxjs";
import {App} from "../../models/app.model";
import {AppDialogComponent} from "./app-dialog/app-dialog.component";

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'productListCount', 'operation'];
  apps$!: Observable<App[]>;

  constructor(
    public dialog: MatDialog,
    private appService: AppService,
    private productService: ProductService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getApps();
  }

  getApps(): void {
    this.apps$ = this.appService.getApps();
  }

  openAppDialog(app?: App): void {
    this.dialog.open(AppDialogComponent, {
      width: '500px',
      data: app || null
    });
  }

  deleteApp(appId: string): void {
    this.appService.deleteApp(appId)
      .then((res: any) => {
        this.snackbarService.successSnackbar('Uygulama başarıyla silindi.');

        this.productService.resetAppIdForDeletedApp(appId);
      })
      .catch((err: any) => {
        this.snackbarService.errorSnackbar('Uygulama silinirken bir hata oluştu.');
      });
  }

}
