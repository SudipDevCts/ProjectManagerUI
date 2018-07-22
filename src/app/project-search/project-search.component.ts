import { Component, OnInit } from '@angular/core';
import { ProjectMangerService } from '../SharedServices/project-manger.service';
import { ProjectModel } from '../Model/project-model';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.css']
})
export class ProjectSearchComponent implements OnInit {

  constructor(private projectManagerService: ProjectMangerService, public dialModalRef: MatDialogRef<ProjectSearchComponent>) { }
  projects: ProjectModel[];
  path: string;
  query: string;
  order = 1;
  ngOnInit() {
    this.projectManagerService.GetProject().subscribe(result => {this.projects = result; });
  }

  Select(project: any) {
    this.dialModalRef.close(project);
   }

}
