import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import {FileUploadComponent} from './components/file-upload/file-upload.component';


import { NgModule }                                 from '@angular/core';
import { CommonModule }                             from '@angular/common';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'file', component: FileUploadComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ReactiveFormsModule],
  exports: [RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]

})
export class AppRoutingModule { }

