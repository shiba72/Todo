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
  private templateFlg = 0; // クライアント側でフィルターするため。ngSwitchの分岐に使う
  @Input() list: List;
  ArrayList = new Array<List>();
  showLists:　any = new Array<List>();
  showDoLists:　any = new Array<List>();
  showDidLists:　any = new Array<List>();
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
          item.userId,
          item.createDateTime,
          item.updateDateTime,
          item.title,
          item.content,
          item.status
        );
      });
      console.log('ログインしてるユーザーは:' + JSON.parse(localStorage.getItem('jsonVal')).loginUserId + 'さん');
    });
  }
  ngOnInit() {}
  // 全てのTodoリストを取得
  dodidLists() {
    this.showLists.length = 0;
    this.templateFlg = 3; // ngSwitchの分岐用
    // userIdが一致するTodoListを表示
    for ( var k = 0;  k < this.ArrayList.length ;  k++  ) {
      if (this.ArrayList[k].userId === JSON.parse(localStorage.getItem('jsonVal')).loginUserId) {
        this.showLists.push(this.ArrayList[k]);
      } else {}
    }
  }
  // 完了のTodoリストを取得
  doLists() {
    this.showDoLists.length = 0;
    this.templateFlg = 1; // ngSwitchの分岐用
    for ( var k = 0;  k < this.ArrayList.length ;  k++  ) {
      if (this.ArrayList[k].userId === JSON.parse(localStorage.getItem('jsonVal')).loginUserId && this.ArrayList[k].status === '完了'){
        this.showDoLists.push(this.ArrayList[k]);
      } else {}
    }
  }
  // 未完了のTodoリストを取得
  didLists() {
    this.showDidLists.length = 0; // 毎回空にする。
    this.templateFlg = 2; // ngSwitchの分岐用
    for ( var k = 0;  k < this.ArrayList.length ;  k++  ) {
      if (this.ArrayList[k].userId === JSON.parse(localStorage.getItem('jsonVal')).loginUserId && this.ArrayList[k].status === '未完了'){
        this.showDidLists.push(this.ArrayList[k]);
      } else {}
    }
  }

}
