import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../component/model/brand.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  formData: Brand;
  readonly APIUrl = "http://localhost:8080/ngocanh-pilot/brand/";

  getAllBrandList(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.APIUrl + "get-all-brand");
  }

  addBrand(body){
    const url = this.APIUrl+'add-brand';
    return this.http.post(url, body);
  }
  deleteBrand(body){
    const url = this.APIUrl+'delete-brand';
    return this.http.post(url, body);
  }
  editBrand(body){
    const url = this.APIUrl+'edit-brand';
    return this.http.put(url, body);
  }

  private _listeners = new Subject<any>();
  listen() : Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy: string){
    this._listeners.next(filterBy);
  }

  getAllBrandName() {
    const url = this.APIUrl + "get-all-name";
    return this.http.get<string[]>(url);
  }

  findBrandByName(brandName: string) {
    const url = this.APIUrl + "get-brand/" + brandName;
    return this.http.get<Brand>(url);
  }
}
