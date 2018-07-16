import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../Model/task-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor() { }
  addTaskForm: FormGroup;
  formSubmitted = false;
  taskModel: TaskModel ;
  tasks: TaskModel[] ;
  ngOnInit() {
    this.addTaskForm = new FormGroup ({
      Task: new FormControl('', Validators.required),
      Priority: new FormControl(1, Validators.min(1)),
      ParentTask: new FormControl(''),
      StartDate: new FormControl('', Validators.required),
      EndDate : new FormControl('', Validators.required)

});

}
}
