import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from 'src/app/model/list';
import { ListService } from 'src/app/services/list.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() list: List;
  ArrayList = new Array<List>();
  constructor(
    private client: HttpClient,
    private listService: ListService
  ) {
    listService.allList().subscribe( response => {
      console.log(response);
      console.log(response.length);
      this.ArrayList = response.map(item => {
        console.log(item);
        return new List(
          item.id,
          item.UserId,
          item.createDateTime,
          item.updateDateTime,
          item.title,
          item.content,
          item.status
        );
      })
      console.log('ログインしてるユーザーは:'+JSON.parse(localStorage.getItem('jsonVal')).loginUserId+'さん');
    })
  }
  ngOnInit() {}
  doLists(){
    console.log('完了済み一覧');
  }
  ddLists(){
    console.log('未完了一覧');
  }
}
