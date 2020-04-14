import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';


import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './component/brand/brand.component';
import { ProductComponent } from './component/product/product.component';
import { LoginComponent } from './component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddBrandComponent } from './component/brand/add-brand/add-brand.component';
import { EditBrandComponent } from './component/brand/edit-brand/edit-brand.component';
import { DelBrandComponent } from './component/brand/del-brand/del-brand.component';
import { AddProductComponent } from './component/product/add-product/add-product.component';
import { EditProductComponent } from './component/product/edit-product/edit-product.component';
import { DelProductComponent } from './component/product/del-product/del-product.component';
import { NavBarComponent } from './component/common/nav-bar/nav-bar.component';
import { InterceptorService } from './service/interceptor.service';
import { ShowImageComponent } from './component/common/show-image/show-image.component';


@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ProductComponent,
    LoginComponent,
    AddBrandComponent,
    EditBrandComponent,
    DelBrandComponent,
    AddProductComponent,
    EditProductComponent,
    DelProductComponent,
    NavBarComponent,
    ShowImageComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddBrandComponent,EditBrandComponent,DelBrandComponent]
})
export class AppModule { }
