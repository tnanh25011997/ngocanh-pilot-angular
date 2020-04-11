import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandComponent } from './component/brand/brand.component';
import { ProductComponent } from './component/product/product.component';
import { LoginComponent } from './component/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'product', component: ProductComponent},
  { path: 'brand', component: BrandComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
