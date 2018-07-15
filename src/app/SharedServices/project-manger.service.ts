import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../Model/User';
import { map } from 'rxjs/operators';
import { ProjectModel } from '../Model/project-model';

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

  AddProject(project: ProjectModel) {
    return this.http.post(this.requestUrl + 'AddProject', (project)
    );
  }

  UpdateUser(userObj: UserModel) {
    return this.http.post(this.requestUrl + 'UpdateUser', (userObj)
    );
  }

  GetUser() {
    return this.http
    .get<any[]>(this.requestUrl + 'GetUser')
    .pipe(map(data => data));
  }
  DeleteUser(userId: number) {
    return this.http.delete(this.requestUrl + 'DeleteUser/' + userId
  );
  }

  GetProject() {
    return this.http
    .get<any[]>(this.requestUrl + 'GetProject')
    .pipe(map(data => data));
  }
}
