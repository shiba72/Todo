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
  private templateFlg :number = 0;
  @Input() list: List;
  ArrayList = new Array<List>();
  showLists :any = new Array<List>();
  showDoLists :any = new Array<List>();
  showDidLists :any = new Array<List>();
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
      })
      console.log('ログインしてるユーザーは:'+JSON.parse(localStorage.getItem('jsonVal')).loginUserId+'さん');
    })
  }
  ngOnInit() {}
  dodidLists(){
    this.templateFlg = 3;
    //location.reload();
    //userIdが一致するTodoListを表示
    for (  var k = 0;  k < this.ArrayList.length ;  k++  ) {
      if (this.ArrayList[k].userId === JSON.parse(localStorage.getItem('jsonVal')).loginUserId){
        console.log('あなたの記事番号'+k);
        this.showLists.push(this.ArrayList[k]);
      } else {
        console.log('それ以外'+k);
      }
    }
    console.log(this.showLists);
  }
  doLists(){
    this.templateFlg = 1;
    console.log('完了済み一覧');
    for (  var k = 0;  k < this.ArrayList.length ;  k++  ) {
      if (this.ArrayList[k].userId === JSON.parse(localStorage.getItem('jsonVal')).loginUserId && this.ArrayList[k].status === '完了'){
        console.log('あなたの完了済みの数'+k);
        this.showDoLists.push(this.ArrayList[k]);
      } else {
        console.log('それ以外'+k);
      }
    }
  }
  didLists() {
    this.templateFlg = 2;
    console.log('未完了一覧');
    for (  var k = 0;  k < this.ArrayList.length ;  k++  ) {
      if (this.ArrayList[k].userId === JSON.parse(localStorage.getItem('jsonVal')).loginUserId && this.ArrayList[k].status === '未完了'){
        console.log('あなたの未完了の数'+k);
        this.showDidLists.push(this.ArrayList[k]);
      } else {
        console.log('それ以外'+k);
      }
    }
  }

}
