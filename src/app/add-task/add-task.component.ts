import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../Model/task-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectSearchComponent } from '../project-search/project-search.component';
import { MatDialog } from '@angular/material';
import { ProjectModel } from '../Model/project-model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  addTaskForm: FormGroup;
  formSubmitted = false;
  taskModel: TaskModel ;
  tasks: TaskModel[] ;
  selectedProject: ProjectModel;
  isParentTask: boolean;
  ngOnInit() {
    this.addTaskForm = new FormGroup ({
      Task: new FormControl('', Validators.required),
      IsParent: new FormControl(this.isParentTask, Validators.required),
      ProjectName: new FormControl({value: '', disabled: true}, Validators.required),
      Priority: new FormControl({value: 1, disabled: this.isParentTask}, Validators.min(1)),
      ParentTask: new FormControl({value: '', disabled: this.isParentTask}),
      StartDate: new FormControl({value: '', disabled: this.isParentTask}, Validators.required),
      EndDate : new FormControl({value: '', disabled: this.isParentTask}, Validators.required)

});

}

setParentTask(e: any) {
  if (e.target.checked) {
    this.isParentTask = true;
  } else {
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
}
