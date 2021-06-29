import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupUsersComponent } from './signup-users.component';

const routes: Routes = [
  {
    path: '',
    component: SignupUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupUsersRoutingModule { }
