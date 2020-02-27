import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from '../model/list';
@Injectable({
  providedIn: 'root'
})
export class ListService {
  // リスト作成
  constructor(private http: HttpClient) { }
  public createList(list: List): Observable<List[]> {
    // 新規作成したユーザー情報をPOST
    const createListUrl = 'https://oceanic-airway-268105.appspot.com/samples/addList';
    return this.http.post<List[]>(createListUrl, list);
  }

  // リスト取得
  public allList(): Observable<List[]> {  // 既存の全ユーザー情報をGET
    const allListUrl = 'https://oceanic-airway-268105.appspot.com/samples/getAllLists';
    console.log(this.http.get<List[]>(allListUrl));
    return this.http.get<List[]>(allListUrl);
  }
}
