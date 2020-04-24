import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Token } from '../model/auth.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router,
    private snackBar: MatSnackBar) { }

  username='';
  password='';
  private token: Token;
  ngOnInit(): void {
    
  }
  onSubmit(form){
    this.loginService.login(form.value.username, form.value.password)
      .subscribe(res => {
        
        this.token = res,
        console.log(this.token),
        localStorage.setItem('access_token', this.token.access_token),
        localStorage.setItem('refresh_token', this.token.refresh_token),

        this.router.navigateByUrl('/brand')
      },
      error =>{
        this.snackBar.open("Login Failed",'',{
          duration:3000,
          panelClass:'custom-snackbar-err',
          verticalPosition:'top'
        })
      }
      );
  }
  
}

