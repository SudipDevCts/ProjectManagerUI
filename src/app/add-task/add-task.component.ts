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

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private dialog: MatDialog, private projectManagerService: ProjectMangerService) { }
  addTaskForm: FormGroup;
  formSubmitted = false;
  taskModel: TaskModel ;
  tasks: TaskModel[] ;
  selectedProject: ProjectModel;
  selectedUser: UserModel;
  isParentTask: boolean;
  pTask: ParentTask;
  ngOnInit() {
    this.addTaskForm = new FormGroup ({
      Task: new FormControl('', Validators.required),
      IsParent: new FormControl(false, Validators.required),
      ProjectName: new FormControl({value: '', disabled: true}, Validators.required),
      Priority: new FormControl({value: 1, disabled: false}, Validators.min(1)),
      ParentTask: new FormControl({value: '', disabled: true}),
      StartDate: new FormControl({value: '', disabled: false}, Validators.required),
      EndDate : new FormControl({value: '', disabled: false}, Validators.required),
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
  this.selectedUser = result;
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
  }
}
}
