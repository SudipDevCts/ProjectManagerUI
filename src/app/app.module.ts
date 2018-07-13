import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { MatDialogModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchFilterPipe } from './SharedPipes/search-filter.pipe';
import { SortFilterPipe } from './SharedPipes/sort-filter.pipe';
import { AddprojectComponent } from './addproject/addproject.component';
import { UserPopUpComponent } from './user-pop-up/user-pop-up.component';


const appRoutes: Routes = [
  { path: 'AddUser', component: AdduserComponent },
  { path: 'AddProject', component: AddprojectComponent },
  { path: '', component: ViewtaskComponent },
  { path: '**', component: ViewtaskComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AdduserComponent,
    ViewtaskComponent,
    SearchFilterPipe,
    SortFilterPipe,
    AddprojectComponent,
    UserPopUpComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  entryComponents: [ UserPopUpComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
