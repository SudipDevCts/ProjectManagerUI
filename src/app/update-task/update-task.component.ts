import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectMangerService } from '../SharedServices/project-manger.service';
import { Task } from '../Model/Task';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectModel } from '../Model/project-model';
import { UserModel } from '../Model/User';
import { ParentTask } from '../Model/ParentTask';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute, private projectManagerService: ProjectMangerService,
    private router: Router) { }
  task: Task;
  taskId: number;
  updateTaskForm: FormGroup;
  formSubmitted = false;
  selectedProject: ProjectModel;
  selectedUser: UserModel;
  selectedParent: ParentTask;
  isParentTask = false;
  pTask: ParentTask;
  startdate = new Date();
  enddate = this.startdate.setDate(this.startdate.getDate() + 1);
  ngOnInit() {
    this.taskId = this.route.snapshot.params.taskid;
    this.Initialize();
  }

  Initialize() {
    this.projectManagerService.GetSpecificTask(this.taskId).subscribe(res => {this.task = res;
      console.log(this.task);
      this.updateTaskForm = new FormGroup ({
        Task: new FormControl(this.task.Task, Validators.required),
        IsParent: new FormControl({value: false, disabled: true}),
        Project: new FormControl({value: this.task.Project, disabled: true}, Validators.required),
        Priority: new FormControl({value: this.task.Priority, disabled: false}, Validators.min(0)),
        ParentTask: new FormControl({value: this.task.ParentTask, disabled: true}),
        // tslint:disable-next-line:max-line-length
        StartDate: new FormControl({value: new Date(this.task.StartDate).toISOString().substring(0, 10), disabled: false}, Validators.required),
        // tslint:disable-next-line:max-line-length
        EndDate : new FormControl({value: new Date(this.task.EndDate).toISOString().substring(0, 10), disabled: false}, Validators.required),
        User : new FormControl({value: this.task.User, disabled: true}, Validators.required)
  });

  console.log(this.updateTaskForm);
     });
  }
}
