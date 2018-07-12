import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchFilterPipe } from './SharedPipes/search-filter.pipe';


const appRoutes: Routes = [
  { path: 'AddUser', component: AdduserComponent },
  { path: '', component: ViewtaskComponent },
  { path: '**', component: ViewtaskComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AdduserComponent,
    ViewtaskComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
