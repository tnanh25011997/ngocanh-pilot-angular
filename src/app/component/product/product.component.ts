import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BrandService } from 'src/app/service/brand.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Product } from '../model/product.model';
import { ProductService } from 'src/app/service/product.service';
import { AddProductComponent } from '../product/add-product/add-product.component';
import { DelProductComponent } from './del-product/del-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private dialog:MatDialog, 
    public brandService: BrandService, private router:Router) { 
    this.productService.listen().subscribe((m:any)=>{
      //subscribe su kien listen
      console.log(m);
      this.refreshProductList(this.formSearchNull);
    })
  }

  private productList: Array<Product>;
  public brandNameDefault;
  public priceFromDefault;
  public priceToDefault;
  public listBrandName: string[];
  public totalPage: number;
  public currentPage = 0;
  public pageNumbersList: Array<number>;
  private formSearchNull = { 'productName': '', 'brandName': '', 'priceFrom': 0, 'priceTo': 0 };
  public formSearchActive;
  private tempSearch = false;
  listData: MatTableDataSource<any>;
  displayedColumns : string[] = ['ProductID','ProductName','Quantity','Price','SaleDate','Image','Description','BrandName','Options'];

  ngOnInit(): void {
    this.brandNameDefault='Apple';
    this.priceFromDefault=0;
    this.priceToDefault=0;
    this.refreshProductList(this.formSearchNull);
    this.brandService.getAllBrandName().subscribe(res=>{
      this.listBrandName = res;
    });
  }

  refreshProductList(body: any){
    
    this.productService.getProductPagination(this.currentPage, body).subscribe(data=>{
      this.productList = data['responseData'],
      this.totalPage = data['totalPage'],
      this.pageNumbersList = data['pageNumbersList'],
      this.listData = new MatTableDataSource(this.productList);
    },
    error =>{
      this.router.navigate(['/login']);
    });
    this.formSearchActive = body;
    
    // If using search
    if (body.productName != '' || body.brandName != '' || body.priceFrom != 0 || body.priceTo != 0) {
      this.tempSearch = true;
    }
  }

  onDelete(product : Product){
    this.productService.formData = product;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(DelProductComponent, dialogConfig);
  }
  onEdit(product : Product){
    this.productService.formData = product;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EditProductComponent, dialogConfig);
  }
  onAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddProductComponent, dialogConfig);
  }
  setPageChange(currentPage: any){
    this.currentPage = currentPage;
    if(this.tempSearch == true){
      this.refreshProductList(this.formSearchActive);
    }else{
      this.refreshProductList(this.formSearchNull);
    }
  }
  
}
