import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialogModule, MatDialog} from '@angular/material';
import { UserPopUpComponent } from '../user-pop-up/user-pop-up.component';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  startdate = new Date();
  isSetDateChecked = true;
  enddate = this.startdate.setDate(this.startdate.getDate() + 1);
  constructor(public dialog: MatDialog) { }
  addProjectForm: FormGroup;
  formSubmitted = false;
  datesDisabled = false;
  ngOnInit() {

    this.addProjectForm = new FormGroup ({
      ProjectName: new FormControl('', Validators.required),
      // StartDate: new FormControl(new Date().toISOString().substring(0, 10), Validators.required),
      StartDate: new FormControl({value: new Date().toISOString().substring(0, 10), disabled: !this.isSetDateChecked}, Validators.required),
      // tslint:disable-next-line:max-line-length
      EndDate: new FormControl( {value: new Date(this.enddate).toISOString().substring(0, 10), disabled: !this.isSetDateChecked}, Validators.required),
      SetDate: new FormControl(this.isSetDateChecked, Validators.required),
      Priority: new FormControl(0),
      ManagerName: new FormControl('', Validators.required)
});
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
      position: {left: '350px', top: '-20px' },
      data: 'This text is passed into the dialog!'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
