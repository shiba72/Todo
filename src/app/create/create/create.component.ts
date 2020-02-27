import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { List } from 'src/app/model/list';
import { ListService } from 'src/app/services/list.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Input() loginUser : User;
  // Todoリスト作成フォーム
  createForm =this.fb.group({
    createTitle: ['',[
      Validators.required,
      Validators.maxLength(30)
    ]],
    createContent: ['',[
      Validators.required,
      Validators.maxLength(30)
    ]],
    createStatus:['',[
      Validators.pattern(/完了| 未完了/)
    ]]
  })
  get titleControl(){
    return this.createForm.get('createTitle') as FormControl;
  }
  get contentControl(){
    return this.createForm.get('createContent') as FormControl;
  }
  constructor(
    private fb: FormBuilder,
    private listService: ListService,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }
  // Todoリスト作成フォームで入力した内容を変数へ代入
  inputTitle = this.createForm.get('createTitle') as FormControl;
  inputContent = this.createForm.get('createContent') as FormControl;
  inputStatus = this.createForm.get('createStatus') as FormControl;
  userIId = JSON.parse(localStorage.getItem('jsonVal')).loginUserId;
  ngOnInit() {
    console.log('ログインしてるユーザーは:'+JSON.parse(localStorage.getItem('jsonVal')).loginUserId+'さん');
  }
  // Todoリスト
  sub(){
    var ListTmp = new List(
      this.userIId,
      this.userIId,
      null,
      null,
      this.inputTitle.value,
      this.inputContent.value,
      this.inputStatus.value
    );
    this.createList(ListTmp);
  }
  createList(list: List): void {
    this.listService.createList(list)
      .subscribe(list => {
        console.log('create list:'+ list);
      });
      //this.snackbar.open('Todoリスト作成完了' , null ,{ //成功したらスナックバーを表示
      //  duration: 3000
      //});
      //this.router.navigateByUrl('/list'); //Todoリスト一覧画面へ遷移

  }

}
