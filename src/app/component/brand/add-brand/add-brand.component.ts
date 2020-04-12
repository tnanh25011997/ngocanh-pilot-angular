import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { BrandService } from 'src/app/service/brand.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<AddBrandComponent>,
    public brandService: BrandService,
    private snackBar: MatSnackBar) { }

  private logoName: string;
  selectedFiles: FileList;
  currentFileUpload: File;
  parts: any;

  ngOnInit(): void {
    this.resetForm();
  }
  resetForm(form?:NgForm){
    if(form!=null){
      form.resetForm();
    }
    this.brandService.formData = {
      brandId: 0,
      brandName:'',
      logo:'',
      description:''
    }
  }
  onFileSelect(event){
    //change imagename
    let r = Math.random().toString(36).substring(7);
    console.log(event.target.files[0]['name']);
    this.logoName = event.target.files[0]['name'];
    this.parts = this.logoName.split('.');
    this.logoName=this.parts[0]+"-"+r+"."+this.parts[1];
    console.log(this.logoName);

    //convert to base64
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      //console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

    this.selectedFiles = event.target.files;
    
  }
  onClose(){
    this.dialogbox.close();
    this.brandService.filter('refresh click');
  }
  onSubmit(form:NgForm){
    form.value.logo = this.logoName;
    this.brandService.addBrand(form.value).subscribe(
      res=> {
        this.resetForm(form);
        this.onClose();
        this.snackBar.open(res["message"].toString(),'',{
          duration:3000,
          panelClass:'custom-snackbar',
          verticalPosition:'top',
          horizontalPosition:'right'
        })
      },
    )
    this.currentFileUpload = this.selectedFiles.item(0);
    this.brandService.pushFileToStorage(this.currentFileUpload,this.logoName).subscribe(); 
    
  }
  
}
