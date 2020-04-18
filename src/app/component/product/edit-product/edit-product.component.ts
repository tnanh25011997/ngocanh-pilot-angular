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

  private imageName: string;
  selectedFiles: FileList;
  currentFileUpload: File;
  parts: any;
  urlImg: any;
  tempFileChange: boolean;

  ngOnInit(): void {
    this.brandService.getAllBrandName().subscribe(res=>{
      this.listBrandName = res;
    });
    this.imageName = this.productService.formData.image;
    this.tempFileChange = false;
  }

  onFileSelect(event){
    this.tempFileChange = true;
    //preview
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.urlImg = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    
    //change imagename
    let r = Math.random().toString(36).substring(7);
    console.log(event.target.files[0]['name']);
    this.imageName = event.target.files[0]['name'];
    this.parts = this.imageName.split('.');
    this.imageName=this.parts[0]+"-"+r+"."+this.parts[1];
    console.log(this.imageName);

    

    this.selectedFiles = event.target.files;
    
  }

  onSubmit(form){
    form.value.image = this.imageName;
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
    if(this.tempFileChange == true){
      this.currentFileUpload = this.selectedFiles.item(0);
      this.brandService.pushFileToStorage(this.currentFileUpload,this.imageName).subscribe();
    }
    
  }
  onClose(){
    this.dialogbox.close();
    this.productService.filter('refresh click');
  }

}
