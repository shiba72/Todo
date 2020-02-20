import { Component, OnInit, Input } from '@angular/core';
import { List } from 'src/app/interfaces/list';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() list: List;
  constructor(
    private client: HttpClient
  ) { }

  ngOnInit() {}
}
