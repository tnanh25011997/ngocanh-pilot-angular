import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/service/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-del-product',
  templateUrl: './del-product.component.html',
  styleUrls: ['./del-product.component.css']
})
export class DelProductComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<DelProductComponent>,
    public service:ProductService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  confirmDelete(){
    this.service.deleteProduct(this.service.formData).subscribe(res=>{
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
