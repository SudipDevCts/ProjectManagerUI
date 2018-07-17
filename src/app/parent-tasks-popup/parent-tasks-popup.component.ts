import { Component, OnInit } from '@angular/core';
import { ProjectMangerService } from '../SharedServices/project-manger.service';
import { ParentTask } from '../Model/ParentTask';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-parent-tasks-popup',
  templateUrl: './parent-tasks-popup.component.html',
  styleUrls: ['./parent-tasks-popup.component.css']
})
export class ParentTasksPopupComponent implements OnInit {

  constructor(private projectManagerService: ProjectMangerService, public dialModalRef: MatDialogRef<ParentTasksPopupComponent>) { }
  ParentTasks: ParentTask[];
  ngOnInit() {
    this.projectManagerService.GetParentTask().subscribe(result => {this.ParentTasks = result; });
  }

  Select(pTask: any) {
    this.dialModalRef.close(pTask);
   }

}
