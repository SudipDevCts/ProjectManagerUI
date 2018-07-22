import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ProjectMangerService } from '../SharedServices/project-manger.service';
import { UserModel } from '../Model/User';

@Component({
  selector: 'app-user-pop-up',
  templateUrl: './user-pop-up.component.html',
  styleUrls: ['./user-pop-up.component.css']
})
export class UserPopUpComponent implements OnInit {

  constructor(public dialModalRef: MatDialogRef<UserPopUpComponent>, private projectManagerService: ProjectMangerService ) {
    this.user = {User_ID: 0, FirstName: '', LastName: '', EmployeeId: 0};
   }
  users: UserModel[] ;
  user: UserModel;
  path: string;
  query: string;
  order = 1;
  ngOnInit() {
    this.Initialize();
  }

 Initialize() {
  this.projectManagerService.GetUser().subscribe(
    restItems => {
      this.users = restItems;
    }
  );
 }

 Select(user: any) {
  this.user = user;
  this.dialModalRef.close(this.user);
 }
}
