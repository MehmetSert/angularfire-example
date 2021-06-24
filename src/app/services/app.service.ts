import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {App} from "../models/app.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private appsCollection: AngularFirestoreCollection<App> = this.store.collection<App>('apps');

  constructor(
    private store: AngularFirestore
  ) { }

  // Tüm uygulamaları getir
  getApps(): Observable<App[]> {
    return this.appsCollection.valueChanges({ idField: 'id' });
  }

  // Uygulama bilgilerini getir
  getApp(appId: string): Observable<any> {
    return this.appsCollection.doc<App>(appId).valueChanges({ idField: 'id' });
  }

  // Uygulama ekle
  addApp(app: App): any {
    return this.appsCollection.add(app);
  }

  // Uygulama güncelle
  updateApp(appId: string, app: App): any {
    return this.appsCollection.doc(appId).update(app);
  }

  // Uygulama sil
  deleteApp(appId: string): any {
    return this.appsCollection.doc(appId).delete();
  }

  // Ürün silindiğinde, silinen ürünün bağlı olduğu uygulamanın productIds fieldını güncelle.
  updateProductIdsForDeletedProduct(deletedProductId: string): any {
    this.store.collection<App>('apps', ref => {
      return ref.where('productIds', 'array-contains', deletedProductId);
    }).valueChanges({ idField: 'id' })
      .subscribe((res: App[]) => {
        res.map((app: App) => {
          const tempApp = {...app};
          tempApp.productIds = tempApp.productIds?.filter(x => x !== deletedProductId);
          return this.appsCollection.doc(app.id).update(tempApp);
        });
      });
  }

}
