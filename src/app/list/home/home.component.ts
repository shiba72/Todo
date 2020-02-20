import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/interfaces/list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  list: List = {
    id: 'test2020',
    userId: 'testuser2020',
    createDateTime: null,
    updateDateTime: null,
    title: 'test-title',
    content: 'test-content',
    status: '未完了'
  };
  constructor() { }

  ngOnInit() {
  }

}
