import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { ConditionalExpr } from '@angular/compiler';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  errMessage:string;//htmlで返す値の型
  emailFormControl = new FormControl('', [
    Validators.required,
    //Validators.email,//後で消す e-mailじゃなくでもいい
  ]);

  loginFormControl = new FormControl('', [
    Validators.required,
    //Validators.email//後で消す e-mailじゃなくでもいい
  ]);
  ArrayUser = new Array<User>();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    authService.user().subscribe( response => {
      console.log(response);
      console.log(response.length);
      this.ArrayUser = response.map(item => {
        console.log(item);
        return new User(
          item.id,
          item.mail,
          item.createDateTime,
          item.updateDateTime
        );
      })
    })
  }
  ngOnInit() {
  }
  accountCreated(){
    console.log(this.emailFormControl.value);
    var UserTmp = new User(
      this.emailFormControl.value,
      this.emailFormControl.value,
      null,
      null
    );
    this.createUser(UserTmp);
    console.log("アカウント制作完了");
    this.snackbar.open('作成完了' , null ,{
      duration: 3000
    })
    //for (  var k = 0;  k < 3 ;  k++  ){
    setTimeout('location.reload();', 100);
    ////クロスサーバーの関係 2回リダイレクト
    //}　手動でリダイレクト
  }
  submit(){
    console.log(this.loginFormControl.value);
    for (  var i = 0;  i < this.ArrayUser.length ;  i++  ) {
      // 繰り返し処理
      console.log(i);
      console.log(this.ArrayUser[i]);
      console.log(this.ArrayUser[i].mail);

           //ID見比べ
     if ( this.loginFormControl.value === this.ArrayUser[i].mail){
      console.log("loginOK");
      var jsonVal = {loginUserId:this.loginFormControl.value};//ローカルストレージ
      localStorage.setItem('jsonVal', JSON.stringify(jsonVal));
      console.log(JSON.parse(localStorage.getItem('jsonVal')).loginUserId);
      this.snackbar.open('ログイン成功' , null ,{
        duration: 3000
      })
      this.router.navigateByUrl('/create');

    } else {
      console.log("NG");
      this.errMessage ='正しいメールアドレスを入れてください';
    }
     //console.log(this.ArrayUser[i])
     }
  }
  createUser(user: User): void {
    this.authService.createUser(user)
      .subscribe(user => {
        console.log('create user:'+ user);
      });
  }

}
