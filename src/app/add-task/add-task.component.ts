import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../Model/task-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectSearchComponent } from '../project-search/project-search.component';
import { MatDialog } from '@angular/material';
import { ProjectModel } from '../Model/project-model';
import { UserPopUpComponent } from '../user-pop-up/user-pop-up.component';
import { UserModel } from '../Model/User';
import { ParentTask } from '../Model/ParentTask';
import { ProjectMangerService } from '../SharedServices/project-manger.service';
import { ParentTasksPopupComponent } from '../parent-tasks-popup/parent-tasks-popup.component';
import { PRIMARY_OUTLET } from '@angular/router';
import { Task } from '../Model/Task';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private dialog: MatDialog, private projectManagerService: ProjectMangerService) { }
  addTaskForm: FormGroup;
  formSubmitted = false;
  selectedProject: ProjectModel;
  selectedUser: UserModel;
  selectedParent: ParentTask;
  isParentTask: boolean;
  pTask: ParentTask;
  startdate = new Date();
  task: TaskModel;
  enddate = this.startdate.setDate(this.startdate.getDate() + 1);
  ngOnInit() {
    this.addTaskForm = new FormGroup ({
      Task: new FormControl('', Validators.required),
      IsParent: new FormControl(false),
      ProjectName: new FormControl({value: '', disabled: true}, Validators.required),
      Priority: new FormControl({value: 1, disabled: false}, Validators.min(0)),
      ParentTask: new FormControl({value: '', disabled: true}),
      StartDate: new FormControl({value: new Date().toISOString().substring(0, 10), disabled: false}, Validators.required),
      EndDate : new FormControl({value: new Date(this.enddate).toISOString().substring(0, 10), disabled: false}, Validators.required),
      User : new FormControl({value: '', disabled: true}, Validators.required)


});

}

setParentTask(e: any) {
  if (e.target.checked) {
    this.addTaskForm.get('StartDate').disable();
    this.addTaskForm.get('EndDate').disable();
    this.addTaskForm.get('Priority').disable();
    this.addTaskForm.get('ParentTask').disable();
    this.isParentTask = true;
  } else {
    this.addTaskForm.get('StartDate').enable();
    this.addTaskForm.get('EndDate').enable();
    this.addTaskForm.get('Priority').enable();
    this.isParentTask = false;
  }
}
OpenModal() {
  const dialogRef = this.dialog.open(ProjectSearchComponent, {
   width: '600px',
   height: '400px',
   position: {left: '30%' },
   data: ''
 });
 dialogRef.afterClosed().subscribe(result => {
  this.selectedProject = result;
  this.addTaskForm.patchValue({ProjectName : result.Project});
 });
}
OpenUserModal() {
  const dialogRef = this.dialog.open(UserPopUpComponent, {
   width: '600px',
   height: '400px',
   position: {left: '30%' },
   data: ''
 });
 dialogRef.afterClosed().subscribe(result => {
  this.selectedUser = result;
  this.addTaskForm.patchValue({User : result.FirstName + ' ' + result.LastName});
 });
}
OpenParentTaskModal() {
  const dialogRef = this.dialog.open(ParentTasksPopupComponent, {
   width: '600px',
   height: '400px',
   position: {left: '30%' },
   data: ''
 });
 dialogRef.afterClosed().subscribe(result => {
  this.selectedParent = result;
  this.addTaskForm.patchValue({ParentTask : result.Parent_Task});
 });
}

onFormSubmit() {
  this.formSubmitted = true;
  if (this.isParentTask) {
    if ( !this.addTaskForm.invalid) {
      this.pTask = {Parent_ID: 0, Parent_Task: this.addTaskForm.value.Task};
      this.projectManagerService.AddParentTask(this.pTask).subscribe(result => {
        alert('Parent Task  has been added'); });
    }
  } else {
    if (!this.ValidateFormControls() && this.ValidateDates(this.addTaskForm)
       && !this.addTaskForm.invalid) {
         let parentId = null;
         if (this.selectedParent && this.selectedParent.Parent_ID) {
            parentId = this.selectedParent.Parent_ID;
         }
        const task: Task = {Task_ID: 0, Task: this.addTaskForm.value.Task,
                                Priority: this.addTaskForm.value.Priority,
                                StartDate: this.addTaskForm.value.StartDate,
                                EndDate: this.addTaskForm.value.EndDate,
                                Project_ID: this.selectedProject.Project_ID,
                                User_ID: this.selectedUser.User_ID,
                                Parent_ID: parentId};
        this.projectManagerService.AddTask(task).subscribe(result => {
          alert('Task has been added');
          this.Reset();
        });
    }
  }
}
ValidateFormControls() {
  let errorMessage = '';
  let validationFailed = false;
  if (!this.selectedProject || this.selectedProject.Project === '') {
        errorMessage = 'Please select project \n';
        validationFailed = true;
  }
  if (!this.selectedUser || this.selectedUser.FirstName === '') {
    errorMessage = errorMessage + 'Please select User \n';
    validationFailed = true;
  }
  if (validationFailed) {
    alert(errorMessage);
  }
  return validationFailed;
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
  Reset() {
    this.addTaskForm.reset();
    this.selectedParent = null;
    this.selectedProject = null;
    this.selectedUser = null;
    this.addTaskForm.patchValue({SetDate : true, StartDate: new Date().toISOString().substring(0, 10),
      EndDate: new Date(this.enddate).toISOString().substring(0, 10) } );
  }

}
