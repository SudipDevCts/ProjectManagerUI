import { Component, OnInit } from '@angular/core';
import { ProjectMangerService } from '../SharedServices/project-manger.service';
import { TaskModel } from '../Model/task-model';
import { ProjectSearchComponent } from '../project-search/project-search.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ProjectModel } from '../Model/project-model';
import { Task } from '../Model/Task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  constructor(private dialog: MatDialog, private projectManagerService: ProjectMangerService, private router: Router) { }
  tasks: Task[];
  selectedProject: ProjectModel;
  ProjectName: string;
  path: string;
  query: string;
  order = 1;
  ngOnInit() {
    this.Initialize();
  }
  Initialize() {
    this.projectManagerService.GetTasks().subscribe(
      restItems => {
        this.tasks = restItems;
      }
    );
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
    this.ProjectName = result.Project;
    this.tasks = this.tasks.filter(item => {
      return item.Project_ID === this.selectedProject.Project_ID;
    });
    console.log(this.tasks);
   });
  }

  ClearSearch() {
    this.Initialize();
    this.selectedProject = null;
    this.ProjectName = '';
  }

  SortData(prop: string) {
    this.path = prop;
    this.order = this.order * (-1); // change order
    return false; // do not reload
  }

  EndTask(task: Task) {
    this.projectManagerService.EndTask(task).subscribe(item => {this.Initialize(); this.ClearSearch(); });
  }

  EditTask(task: Task) {
    this.router.navigate(['Edit', {taskid : task.Task_ID}]);

  }

}
