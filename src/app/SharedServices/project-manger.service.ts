import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../Model/User';
import { map } from 'rxjs/operators';

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

  GetUser() {
    return this.http
    .get<any[]>(this.requestUrl + 'GetUser')
    .pipe(map(data => data));
  }
}
