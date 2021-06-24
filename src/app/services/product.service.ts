import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Product} from "../models/product.model";
import {Observable} from "rxjs";
import {map, mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsCollection: AngularFirestoreCollection<Product> = this.store.collection<Product>('products');

  constructor(
    private store: AngularFirestore
  ) { }

  // Tüm ürünleri getir
  getProducts(): Observable<Product[]> {
    return this.productsCollection.valueChanges({ idField: 'id' });
  }

  // Uygulamaya kayıt edilebilir ürünleri getir
  getSelectableProductsForApps(appId?: string): Observable<Product[]> {
    // Firebase ile aynı field'a "or" kullanarak sorgu yapılamıyor. Bu yüzden 2 farklı sorgu çalıştırıp bunları birleştirmek gerekiyor.

    const productWithNullAppId =  this.store.collection<Product>('products', ref => {
      return ref.where('appId', '==', null);
    }).valueChanges({ idField: 'id' });

    if (appId) {
      const productWithAppId = this.store.collection<Product>('products', ref => {
        return ref.where('appId', '==', appId);
      }).valueChanges({ idField: 'id' });

      return productWithAppId.pipe(
        mergeMap(res1 => productWithNullAppId.pipe(map(res2 => [...res1, ...res2])))
      );
    }

    return productWithNullAppId;

  }

  // Ürün ekle
  addProduct(product: Product): any {
    return this.productsCollection.add(product);
  }

  // Ürün güncelle
  updateProduct(productId: string, product: Product): any {
    return this.productsCollection.doc(productId).update(product);
  }

  // Ürün sil
  deleteProduct(productId: string): any {
    return this.productsCollection.doc(productId).delete();
  }

  // Uygulama eklerken veya düzenlerken seçilen ürünlerin appId fieldlarını güncelle
  updateAppIdsOfSelectedProducts(productIds: string[], appId: string): any {
    productIds.map((productId) => {
      return this.productsCollection.doc(productId).update({ appId });
    });
  }

  // Uygulama silindiğinde, silinen uygulamaya bağlı olan ürünlerin appId fieldlarını tekrar null yap
  resetAppIdForDeletedApp(deletedAppId: string): any {
    this.store.collection<Product>('products', ref => {
      return ref.where('appId', '==', deletedAppId);
    }).valueChanges({ idField: 'id' })
      .subscribe((res: Product[]) => {
        res.map((product: Product) => {
          return this.productsCollection.doc(product.id).update({ appId: null });
        });
      });
  }

}
