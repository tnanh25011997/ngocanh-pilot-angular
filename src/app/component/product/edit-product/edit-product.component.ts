import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { BrandService } from 'src/app/service/brand.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<EditProductComponent>,
    public productService: ProductService,
    public brandService: BrandService,
    private snackBar: MatSnackBar) { }

  public listBrandName: string[];
  public brandNameDefault = 'Apple';

  ngOnInit(): void {
    this.brandService.getAllBrandName().subscribe(res=>{
      this.listBrandName = res;
    });
  }
  onSubmit(form){

    this.brandService.findBrandByName(form.value.brandName).subscribe(brand=>{
      form.value.brandEntity = brand;
      this.productService.editProduct(form.value).subscribe(res => {
        
        this.snackBar.open(res["message"].toString(),'',{
          duration:3000,
          panelClass: 'custom-snackbar',
          verticalPosition:'top',
          horizontalPosition:'right'
        })
      })
    });
    console.log(form.value);
  }
  onClose(){
    this.dialogbox.close();
    this.productService.filter('refresh click');
  }

}
