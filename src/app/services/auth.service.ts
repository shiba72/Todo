import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }
  public user(): Observable<User[]> {
    // 既存のTodoリストの情報をGET
    const url = 'https://oceanic-airway-268105.appspot.com/samples/getAllUsers';
    return this.http.get<User[]>(url);
  }
  public createUser(user: User): Observable<User[]> {
    // 作成したTodoリストの情報をPOST
    const createUserUrl = 'https://oceanic-airway-268105.appspot.com/samples/addUser';
    return this.http.post<User[]>(createUserUrl, user);
  }

}
