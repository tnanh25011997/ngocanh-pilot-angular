import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {

  private image: string;
  private name: string;
  private temp: boolean;
  constructor(public dialogRef: MatDialogRef<ShowImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // brand
    if (this.data.brandName != undefined ) {
      this.name = this.data.brandName;
      this.image = this.data.logo;
      this.temp = false;
    }

    // product
    if (this.data.productName != undefined ) {
      this.name = this.data.productName;
      this.image = this.data.image;
      this.temp = true;
    }
  }

}
