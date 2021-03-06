import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { BrandService } from 'src/app/service/brand.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<EditBrandComponent>,
    public brandService: BrandService,
    private snackBar: MatSnackBar) { }

  private logoName: string;
  selectedFiles: FileList;
  currentFileUpload: File;
  parts: any;

  urlImg: any;
  tempFileChange: boolean;

  ngOnInit(): void {
    this.logoName = this.brandService.formData.logo;
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
    this.logoName = event.target.files[0]['name'];
    this.parts = this.logoName.split('.');
    this.logoName=this.parts[0]+"-"+r+"."+this.parts[1];
    console.log(this.logoName);

    

    this.selectedFiles = event.target.files;
    
  }
  onClose(){
    this.dialogbox.close();
    this.brandService.filter('refresh click');
  }
  onSubmit(form:NgForm){
    //upload image
    if(this.tempFileChange == true){
      this.currentFileUpload = this.selectedFiles.item(0);
      this.brandService.pushFileToStorage(this.currentFileUpload,this.logoName).subscribe();
    } 
    
    form.value.logo = this.logoName;
    this.brandService.editBrand(form.value).subscribe(
      res=> {
        
        this.snackBar.open(res["message"].toString(),'',{
          duration:3000,
          panelClass:'custom-snackbar',
          verticalPosition:'top',
          horizontalPosition:'right'
        })
      }
    );
     
  }

}
