import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class ProjectMangerService {
  requestUrl: string;
  constructor(private http: HttpClient ) {this.requestUrl = 'http://localhost:44851/api/'; }

  AddUser(userObj: UserModel) {
    return this.http.post(this.requestUrl + 'AddUser', (userObj)
    );
  }

  GetUser(userObj: UserModel) {
    return this.http.get(this.requestUrl + 'GetUser');
  }
}
