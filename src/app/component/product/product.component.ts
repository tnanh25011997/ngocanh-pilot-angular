import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BrandService } from 'src/app/service/brand.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Product } from '../model/product.model';
import { ProductService } from 'src/app/service/product.service';
import { AddProductComponent } from '../product/add-product/add-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private dialog:MatDialog) { 
    this.productService.listen().subscribe((m:any)=>{
      //subscribe su kien listen
      console.log(m);
      this.refreshProductList();
    })
  }

  listData: MatTableDataSource<any>;
  displayedColumns : string[] = ['ProductID','ProductName','Quantity','Price','SaleDate','Image','Description','BrandName'];

  ngOnInit(): void {
    this.refreshProductList();
  }

  refreshProductList(){
    
    this.productService.getAllProductList().subscribe(data=>{
      this.listData = new MatTableDataSource(data);
    });
  }

  onDelete(product : Product){
    
  }
  onEdit(product : Product){
   
  }
  onAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(AddProductComponent, dialogConfig);
  }

}
