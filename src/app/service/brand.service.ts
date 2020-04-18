import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
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
  getBrandPagination(page: number, name: string){
    return this.http.get(this.APIUrl + 'get-brands-paginate?page=' + page + '&name='+name+'&access_token='+localStorage.getItem('access_token'));
  }

  addBrand(body){
    const url = this.APIUrl+'insert-brand';
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

  pushFileToStorage(file: File, logoName: string): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    data.append('logoName', logoName);
    const newRequest = new HttpRequest('POST', 'http://localhost:8080/ngocanh-pilot/brand/upload', data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
  }
}
