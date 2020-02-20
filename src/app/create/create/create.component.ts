import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
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
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }
  sub(){
    console.log(this.createForm.value);
  }

}
