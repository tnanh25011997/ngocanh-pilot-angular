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

  ngOnInit(): void {
  }
  onClose(){
    this.dialogbox.close();
    this.brandService.filter('refresh click');
  }
  onSubmit(form:NgForm){
    this.brandService.editBrand(form.value).subscribe(
      res=> {
        
        this.snackBar.open(res["message"].toString(),'',{
          duration:3000,
          panelClass: ['blue-snackbar'],
          verticalPosition:'top'
        })
      }
    )
    
  }

}
