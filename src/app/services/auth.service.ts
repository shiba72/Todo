import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  User() {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient) { }
  public user(): Observable<User[]>
  {
    const url = 'https://oceanic-airway-268105.appspot.com/samples/getAllUsers';
    console.log(this.http.get<User[]>(url));
    return this.http.get<User[]>(url);
  }
  public createUser(user: User): Observable<User[]> {
    // APIのURL、送信したいデータを指定してpost()を呼び出す。
    const createUserUrl = 'https://oceanic-airway-268105.appspot.com/samples/addUser';
    console.log(this.http.post<User[]>(createUserUrl,user));
    return this.http.post<User[]>(createUserUrl,user);
  }

}
