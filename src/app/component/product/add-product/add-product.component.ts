import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { BrandService } from 'src/app/service/brand.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<AddProductComponent>,
    public productService: ProductService,
    public brandService: BrandService,
    private snackBar: MatSnackBar) { }

  public listBrandName: string[];
  public brandNameDefault = 'Apple';
  ngOnInit(): void {
    this.resetForm();
    this.brandService.getAllBrandName().subscribe(res=>{
      this.listBrandName = res;
    });
  }

  resetForm(form?:NgForm){
    if(form!=null){
      form.resetForm();
    }
    this.productService.formData = {
      productId: 0,
      productName:'',
      quantity:null,
      price:null,
      saleDate:null,
      image:'',
      description:'',
      brandEntity:null
    }
  }


  onSubmit(form){

    this.brandService.findBrandByName(form.value.brandName).subscribe(brand=>{
      form.value.brandEntity = brand;
      this.productService.addProduct(form.value).subscribe(res => {
        this.onClose();
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
