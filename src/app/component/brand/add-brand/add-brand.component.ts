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

  onClose(){
    this.dialogbox.close();
    this.brandService.filter('refresh click');
  }
  onSubmit(form:NgForm){
    this.brandService.addBrand(form.value).subscribe(
      res=> {
        this.resetForm(form);
        this.onClose();
        this.snackBar.open(res["message"].toString(),'',{
          duration:3000,
          panelClass: ['blue-snackbar'],
          verticalPosition:'top'
        })
      }
    )
    
  }
}
