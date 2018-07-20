import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectMangerService } from '../SharedServices/project-manger.service';
import { Task } from '../Model/Task';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectModel } from '../Model/project-model';
import { UserModel } from '../Model/User';
import { ParentTask } from '../Model/ParentTask';
import { MatDialog } from '@angular/material';
import { UserPopUpComponent } from '../user-pop-up/user-pop-up.component';
import { ParentTasksPopupComponent } from '../parent-tasks-popup/parent-tasks-popup.component';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute, private projectManagerService: ProjectMangerService,
    private router: Router, private dialog: MatDialog) { }
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
  dataLoaded = false;
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
  this.dataLoaded = true;
  console.log(this.updateTaskForm.getRawValue().User);
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
    this.updateTaskForm.patchValue({User : result.FirstName + ' ' + result.LastName});
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
    this.updateTaskForm.patchValue({ParentTask : result.Parent_Task});
   });
  }

  ValidateFormControls() {
    let errorMessage = '';
    let validationFailed = false;
    if (!this.updateTaskForm.getRawValue() || !this.updateTaskForm.getRawValue().User || this.updateTaskForm.getRawValue().User === '') {
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
      this.ngOnInit();
      this.selectedParent = null;
      this.selectedProject = null;
      this.selectedUser = null;
      // this.updateTaskForm.patchValue({SetDate : true, StartDate: new Date().toISOString().substring(0, 10),
      //   EndDate: new Date(this.enddate).toISOString().substring(0, 10) } );
    }

    onFormSubmit() {
      this.formSubmitted = true;
        if (!this.ValidateFormControls() && this.ValidateDates(this.updateTaskForm)
           && !this.updateTaskForm.invalid) {
             let parentId = null;
             let userId = null;
             if (this.selectedParent && this.selectedParent.Parent_ID) {
                parentId = this.selectedParent.Parent_ID;
             } else {
                parentId = this.task.Parent_ID;
             }

             if (this.selectedUser && this.selectedUser.User_ID) {
              userId = this.selectedUser.User_ID;
           } else {
             userId = this.task.User_ID;
           }
            const task: Task = {Task_ID: this.task.Task_ID,
                                Task: this.updateTaskForm.value.Task,
                                    Priority: this.updateTaskForm.value.Priority,
                                    StartDate: this.updateTaskForm.value.StartDate,
                                    EndDate: this.updateTaskForm.value.EndDate,
                                    Project_ID: this.task.Project_ID,
                                    User_ID: userId,
                                    Parent_ID: parentId, Project: '', User: '', ParentTask: ''};
            this.projectManagerService.Update(task).subscribe(result => {
              alert('Task has been Updated');
              this.router.navigate(['']);
            });
        }
      }
}
