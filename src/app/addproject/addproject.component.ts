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
  query: string;
  path: string;
  order = 1;
  isUpdating = false;
  projectId = 0;


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
    if ( this.ValidateDates(this.addProjectForm) && !this.addProjectForm.invalid) {
      this.project = { Project_ID: 0, Project: '', Priority: 0, StartDate: new Date(),
         EndDate: new Date(), SetDate: false, UserId: 0, TaskId: null, TaskCount: 0, CompletedTasks: 0};
      this.project.Project = this.addProjectForm.value.ProjectName;
      this.project.Priority = this.addProjectForm.value.Priority;
      this.project.StartDate = this.addProjectForm.value.StartDate;
      this.project.EndDate = this.addProjectForm.value.EndDate;
      this.project.SetDate = this.addProjectForm.value.SetDate;
      this.project.UserId = this.manager.User_ID;
      if (!this.isUpdating) {
      this.projectManagerService.AddProject(this.project).subscribe(result => { this.Initialize(); });
    } else {
      this.project.Project_ID = this.projectId;
      this.projectManagerService.UpdateProject(this.project).subscribe(result => { this.Initialize(); });
    }

    }
    }
    Reset() {
      this.addProjectForm.reset();
      // this.Initialize();
    }
    Suspend(prj: ProjectModel) {
      this.projectManagerService.EndProject(prj).subscribe(result => {this.Initialize();
      alert('Project has been suspended'); });
    }

    Update(prj: any) {
      this.addProjectForm = new FormGroup ({
        ProjectName: new FormControl(prj.Project, Validators.required),
        // StartDate: new FormControl(new Date().toISOString().substring(0, 10), Validators.required),
        StartDate: new FormControl({value: new Date(prj.StartDate).toISOString()
            .substring(0, 10), disabled: !this.isSetDateChecked}, Validators.required),
        // tslint:disable-next-line:max-line-length
        EndDate: new FormControl( {value: new Date(prj.EndDate).toISOString().substring(0, 10), disabled: !this.isSetDateChecked}, Validators.required),
        SetDate: new FormControl(this.isSetDateChecked, Validators.required),
        Priority: new FormControl(prj.Priority),
        ManagerName: new FormControl({value: '', disabled: true}, Validators.required)
          });
  this.GetSpecificUser(prj.UserId);
  this.btnText = 'Update';
  this.isUpdating = true;
  this.projectId = prj.Project_ID;
    }
    Initialize() {
       this.projectManagerService.GetProject().subscribe(result => {this.projects = result; });
    }
  SortData(prop: string) {
    this.path = prop;
    this.order = this.order * (-1); // change order
    return false; // do not reload
  }
  ValidateDates(formObject: any) {
    if (formObject) {
        const startDate = formObject.value.StartDate;
        const endDate = formObject.value.EndDate;
        if (startDate && endDate) {
            const dt1 = new Date(startDate);
            const dt2 = new Date(endDate);
            if (dt1 > dt2) {
                alert('Start Date cant be greater than End Date');
                return false;
            }
        }
    }
    return true;
  }
  // ValidatemanagerName() {
  //   if (!this.manager || !this.manager.User_ID || this.manager.User_ID === 0) {
  //       alert('Select Manager  clicking on the search button before submitting');
  //       return false;
  //   }
  //   return true;
  // }
  GetSpecificUser(userId: number) {
    if (userId > 0) {
  this.projectManagerService.GetSpecificUser(userId).subscribe(result => {
    this.addProjectForm.patchValue({ManagerName : result.FirstName +  ' ' + result.LastName});
    this.manager = result;
  });
}
}
}
