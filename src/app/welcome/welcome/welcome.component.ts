import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  loginFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }
  accountCreated(){
    console.log(this.emailFormControl.value);
  }
  submit(){
    console.log(this.loginFormControl.value);
  }


}
