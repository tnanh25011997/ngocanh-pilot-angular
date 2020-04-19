import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandComponent } from './component/brand/brand.component';
import { ProductComponent } from './component/product/product.component';
import { LoginComponent } from './component/login/login.component';
import { LoginGuard } from './service/login.guard';
import { LogoutGuard } from './service/logout.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'product', component: ProductComponent, canActivate: [LoginGuard] },
  { path: 'brand', component: BrandComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LogoutGuard]},
  { path: '**', redirectTo: 'brand', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
