import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { List } from 'src/app/model/list';
import { ListService } from 'src/app/services/list.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Input() loginUser : User;
  createForm =this.fb.group({
    createTitle: ['',[
      Validators.required,
      Validators.maxLength(30)
    ]],
    createContent: ['',[
      Validators.required,
      Validators.maxLength(30)
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
    private authService: AuthService
  ) { }

  inputTitle = this.createForm.get('createTitle') as FormControl;
  inputContent = this.createForm.get('createContent') as FormControl;
  userIId = JSON.parse(localStorage.getItem('jsonVal')).loginUserId;
  //inputLoginId = JSON.parse(localStorage.getItem('jsonVal')).loginUserId ;
  ngOnInit() {
    console.log('ログインしてるユーザーは:'+JSON.parse(localStorage.getItem('jsonVal')).loginUserId+'さん');
    //console.log(this.inputLoginId);
  }
  sub(){
    console.log(this.inputTitle.value);//入力したtitle
    console.log(this.inputContent.value);
    console.log('おぶ'+JSON.stringify(this.userIId));
    //console.log('直前'+this.inputLoginId);
    var ListTmp = new List(
      this.userIId,
      this.userIId,
      null,
      null,
      this.inputTitle.value,
      this.inputContent.value,
      "未完了"
    );
    //console.log('後'+this.inputLoginId);
    this.createList(ListTmp);
    console.log('List店舗'+JSON.stringify(ListTmp));
  }
  createList(list: List): void {
    this.listService.createList(list)
      .subscribe(list => {
        console.log('create list:'+ list);
      });
  }

}
