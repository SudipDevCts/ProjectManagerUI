import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from '../Model/User';
import { ProjectMangerService } from '../SharedServices/project-manger.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  constructor(private projectManagerService: ProjectMangerService) {
    this.userModel = {User_ID: 0, FirstName: '', LastName: '', EmployeeId: 0};
   }
  addUserForm: FormGroup;
  users: UserModel[] ;
  formSubmitted = false;
  userModel: UserModel ;
  btnText: string;
  isUpdating: boolean;
  userId: number;
  ngOnInit() {

    this.addUserForm = new FormGroup ({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      EmployeeId: new FormControl( '', Validators.required)

});
this.Initialize();
  }

  onFormSubmit() {
    this.formSubmitted = true;
    if (!this.addUserForm.invalid) {
      this.userModel.FirstName = this.addUserForm.value.FirstName;
      this.userModel.LastName = this.addUserForm.value.LastName;
      this.userModel.EmployeeId = this.addUserForm.value.EmployeeId;
      if (!this.isUpdating) {
        this.projectManagerService.AddUser(this.userModel).subscribe(result => {this.Initialize(); });
      } else {
        this.userModel.User_ID = this.userId;
        this.projectManagerService.UpdateUser(this.userModel).subscribe(result => {this.Reset(); });
      }
    }
  }
  Reset() {
    this.addUserForm.reset();
    this.Initialize();
  }
  Initialize() {
    this.btnText = 'Add User';
    this.formSubmitted = false;
    this.isUpdating = false;
    this.projectManagerService.GetUser().subscribe(
      restItems => {
        this.users = restItems;
      }
    );
  }

  Update(user: UserModel) {
    this.addUserForm = new FormGroup ({
      FirstName: new FormControl(user.FirstName, Validators.required),
      LastName: new FormControl(user.LastName, Validators.required),
      EmployeeId: new FormControl( user.EmployeeId, Validators.required)
});


this.btnText = 'Update User';
this.isUpdating = true;
this.userId = user.User_ID;
  }

  Delete(id: number) {
    this.projectManagerService.DeleteUser(id).subscribe(result => {this.Reset(); });
  }

}
