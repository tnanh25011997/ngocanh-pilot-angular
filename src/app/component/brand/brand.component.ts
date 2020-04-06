import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BrandService } from 'src/app/service/brand.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { DelBrandComponent } from './del-brand/del-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { Brand } from '../model/brand.model';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  constructor(private brandService: BrandService, private dialog:MatDialog) { 
    this.brandService.listen().subscribe((m:any)=>{
      //subscribe su kien listen
      console.log(m);
      this.refreshBrandList('');
      this.stringSearch = '';
    })
  }
  private tempSearch = false;
  public stringSearch = '';
  public totalPage: number;
  public currentPage = 0;
  public pageNumbersList: Array<number>;
  private brandsList: Array<Brand>;

  listData: MatTableDataSource<any>;
  displayedColumns : string[] = ['BrandID','BrandName','BrandLogo','BrandDescription','Options'];

  ngOnInit(): void {
    this.refreshBrandList('');
  }

  refreshBrandList(brandName: string){
    // this.brandService.getAllBrandList().subscribe(data=>{
    //   this.listData = new MatTableDataSource(data);
    // });
    this.brandService.getBrandPagination(this.currentPage, brandName).subscribe(data=>{
      this.brandsList = data['responseData'],
      this.totalPage = data['totalPage'],
      this.pageNumbersList = data['pageNumbersList'],
      this.listData = new MatTableDataSource(this.brandsList);
    });
    if(brandName != ''){
      this.tempSearch = true;
    }
  }

  onAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(AddBrandComponent, dialogConfig);
  }
  onDelete(brand : Brand){
    this.brandService.formData = brand;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(DelBrandComponent, dialogConfig);
  }
  onEdit(brand : Brand){
    this.brandService.formData = brand;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(EditBrandComponent, dialogConfig);
  }
  setPageChange(currentPage: any) {
    this.currentPage = currentPage;
    if(this.tempSearch == true){
      this.refreshBrandList(this.stringSearch);
    }else{
      this.refreshBrandList('');
    }
  }

  

}
