import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialogModule, MatDialog} from '@angular/material';
import { UserPopUpComponent } from '../user-pop-up/user-pop-up.component';
import { UserModel } from '../Model/User';
import { ProjectModel } from '../Model/project-model';
import { ProjectMangerService } from '../SharedServices/project-manger.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  startdate = new Date();
  isSetDateChecked = true;
  enddate = this.startdate.setDate(this.startdate.getDate() + 1);
  constructor(public dialog: MatDialog, private projectManagerService: ProjectMangerService) {
  //  this.project = {Project_ID=0, Project='', Priority=0, StartDate='', EndDate='', SetDate= false, UserId=0, TaskId= null};
   }
  addProjectForm: FormGroup;
  formSubmitted = false;
  datesDisabled = false;
  manager: UserModel;
  project: ProjectModel;
  btnText = 'Add';
  projects: ProjectModel[];


  ngOnInit() {

    this.addProjectForm = new FormGroup ({
      ProjectName: new FormControl('', Validators.required),
      // StartDate: new FormControl(new Date().toISOString().substring(0, 10), Validators.required),
      StartDate: new FormControl({value: new Date().toISOString().substring(0, 10), disabled: !this.isSetDateChecked}, Validators.required),
      // tslint:disable-next-line:max-line-length
      EndDate: new FormControl( {value: new Date(this.enddate).toISOString().substring(0, 10), disabled: !this.isSetDateChecked}, Validators.required),
      SetDate: new FormControl(this.isSetDateChecked, Validators.required),
      Priority: new FormControl(0),
      ManagerName: new FormControl({value: '', disabled: true}, Validators.required)
});
this.Initialize();
  }

  setDateChanged(e: any) {
    if (e.target.checked) {
      this.addProjectForm.get('StartDate').enable();
      this.addProjectForm.get('EndDate').enable();
    } else {
      // this.addProjectForm.patchValue({
      //   StartDate: '',
      //   EndDate: ''
      //   // formControlName2: myValue2 (can be omitted)
      this.addProjectForm.get('StartDate').disable();
      this.addProjectForm.get('EndDate').disable();
    }
  }
  OpenModal() {
     const dialogRef = this.dialog.open(UserPopUpComponent, {
      width: '600px',
      height: '400px',
      position: {left: '30%' },
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      this.addProjectForm.patchValue({ManagerName : result.FirstName +  ' ' + result.LastName});
      this.manager = result;
    });
  }

  onFormSubmit() {
    this.formSubmitted = true;
    if (!this.addProjectForm.invalid) {
      this.project = { Project_ID: 0, Project: '', Priority: 0, StartDate: new Date(),
         EndDate: new Date(), SetDate: false, UserId: 0, TaskId: null};
      this.project.Project = this.addProjectForm.value.ProjectName;
      this.project.Priority = this.addProjectForm.value.Priority;
      this.project.StartDate = this.addProjectForm.value.StartDate;
      this.project.EndDate = this.addProjectForm.value.EndDate;
      this.project.SetDate = this.addProjectForm.value.SetDate;
      this.project.UserId = this.manager.User_ID;
      this.projectManagerService.AddProject(this.project).subscribe(result => { });
    }
    }
    Reset() {
      this.addProjectForm.reset();
      // this.Initialize();
    }
    Initialize() {
       this.projectManagerService.GetProject().subscribe(result => {this.projects = result; });
    }
}
