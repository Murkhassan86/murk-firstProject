import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginUsersComponent } from './login-users.component';

const routes: Routes = [
  {path: '', component: LoginUsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginUsersRoutingModule { }
