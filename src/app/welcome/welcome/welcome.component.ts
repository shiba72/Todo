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
  // ログインエラーの際のメッセージ
  errMessage: string;
  // フォームについて
  emailFormControl = new FormControl('', [
    Validators.required,
  ]);

  loginFormControl = new FormControl('', [
    Validators.required,
  ]);
  // ユーザー
  ArrayUser = new Array<User>();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    // サービスと連携してユーザー情報を取得
    authService.user().subscribe( response => {
      this.ArrayUser = response.map(item => {
        return new User(
          item.id,
          item.mail,
          item.createDateTime,
          item.updateDateTime
        );
      });
    });
  }
  ngOnInit() {
  }
  // 新規アカウント作成
  accountCreated() {
    console.log(this.emailFormControl.value);
    var UserTmp = new User(
      this.emailFormControl.value,
      this.emailFormControl.value,
      null,
      null
    );
    this.createUser(UserTmp);
    this.snackbar.open('作成完了' , null , {
      duration: 3000
    });
    // アカウント作成後にリダイレクト
    setTimeout('location.reload();', 1000);
  }
  // ログイン処理
  submit()　{
    // 入力したメールアドレスと同じメールアドレスがデータベースにあったログイン成功
    for (  var i = 0;  i < this.ArrayUser.length ;  i++  ) {
      if ( this.loginFormControl.value === this.ArrayUser[i].mail) {
        var jsonVal = {loginUserId: this.loginFormControl.value};
        localStorage.setItem('jsonVal', JSON.stringify(jsonVal)); // ローカルストレージにユーザーを保存
        this.snackbar.open('ログイン成功' , null ,　{ //成功したらスナックバーを表示
          duration: 3000
        });
        this.router.navigateByUrl('/create'); //Todoリスト作成画面へ遷移
        } else {
         this.errMessage = '正しいメールアドレスを入れてください';
      }
       }
  }
  // ユーザー作成
  createUser(user: User): void {
    this.authService.createUser(user)
      .subscribe( user => {
        console.log('create user:' + user);
      });
  }

}
