import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product } from '../component/model/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  formData : Product;
  readonly APIUrl = "http://localhost:8080/ngocanh-pilot/product/";
  
  getAllProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.APIUrl + "get-all-product");
  }
  addProduct(body){
    const url = this.APIUrl+'add-new-product';
    return this.http.post(url, body);
  }
  deleteProduct(body){
    const url = this.APIUrl+'delete-product';
    return this.http.post(url, body);
  }
  editProduct(body){
    const url = this.APIUrl+'edit-product';
    return this.http.put(url, body);
  }

  private _listeners = new Subject<any>();
  listen() : Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy: string){
    this._listeners.next(filterBy);
  }
}
