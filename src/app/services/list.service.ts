import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from '../model/list';
@Injectable({
  providedIn: 'root'
})
export class ListService {
  //リスト作成
  constructor(private http: HttpClient) { }
  public createList(list: List): Observable<List[]> {
    // APIのURL、送信したいデータを指定してpost()を呼び出す。
    const createListUrl = 'https://oceanic-airway-268105.appspot.com/samples/addList';
    //console.log(this.http.post<List[]>(createListUrl,list));
    return this.http.post<List[]>(createListUrl,list);
  }

  //リスト取得
  public allList(): Observable<List[]>
  {
    const allListUrl = 'https://oceanic-airway-268105.appspot.com/samples/getAllLists';
    console.log(this.http.get<List[]>(allListUrl));
    return this.http.get<List[]>(allListUrl);
  }
}
