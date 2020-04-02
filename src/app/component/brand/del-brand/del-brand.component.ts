import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BrandService } from 'src/app/service/brand.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-del-brand',
  templateUrl: './del-brand.component.html',
  styleUrls: ['./del-brand.component.css']
})
export class DelBrandComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<DelBrandComponent>,
    public service:BrandService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  confirmDelete(){
    this.service.deleteBrand(this.service.formData).subscribe(res=>{
      this.closeDialog();
      this.snackBar.open(res["message"].toString(),'',{
        duration:3000,
        verticalPosition:'top',
        panelClass: ['warning']
      })
    });
  }
  closeDialog(){
    this.dialogbox.close();
    this.service.filter('Register click');
  }

}