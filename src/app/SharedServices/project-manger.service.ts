import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../Model/User';
import { map } from 'rxjs/operators';
import { ProjectModel } from '../Model/project-model';
import { ParentTask } from '../Model/ParentTask';
import { TaskModel } from '../Model/task-model';
import { Task } from '../Model/Task';

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

  UpdateProject(project: ProjectModel) {
    return this.http.post(this.requestUrl + 'UpdateProject', (project)
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

  GetSpecificUser (userId: number) {
    return this.http
    .get<UserModel>(this.requestUrl + 'User/' + userId)
    .pipe(map(data => data));
}

  GetProject() {
    return this.http
    .get<any[]>(this.requestUrl + 'GetProject')
    .pipe(map(data => data));
  }

  GetTasks() {
    return this.http
    .get<any[]>(this.requestUrl + 'GetTasks')
    .pipe(map(data => data));
  }
  GetParentTask() {
    return this.http
    .get<any[]>(this.requestUrl + 'GetParentTasks')
    .pipe(map(data => data));
  }
  EndProject(prj: ProjectModel) {
    return this.http.put(this.requestUrl + 'EndProject', prj);
  }

  AddParentTask(pTask: ParentTask) {
    return this.http.post(this.requestUrl + 'AddParentTask', (pTask)
  );
  }

  AddTask(task: Task) {
    return this.http.post(this.requestUrl + 'AddTask', (task));
  }

  EndTask(task: Task) {
    return this.http.put(this.requestUrl + 'EndTask', task);
  }
}
