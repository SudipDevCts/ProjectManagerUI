import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from '../Model/User';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  constructor() { }
  addUserForm: FormGroup;
  formSubmitted = false;
  userModel: UserModel ;
  ngOnInit() {
    this.addUserForm = new FormGroup ({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      EmployeeId: new FormControl( '', Validators.required)

});
  }

  onFormSubmit() {
    this.formSubmitted = true;
    if (!this.addUserForm.invalid) {
      this.userModel.FirstName = this.addUserForm.value.FirstName;
      this.userModel.LastName = this.addUserForm.value.LastName;
      this.userModel.EmployeeId = this.addUserForm.value.EmployeeId;
      // this.addTaskService.AddTask(this.userModel).subscribe(result => {this.router.navigate(['']); });
    }
  }
  Reset() {
    this.addUserForm.reset();
  }

}
