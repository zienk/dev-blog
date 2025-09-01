import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../../shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: `Dashboard`,
      requiredPolicy: "Permissions.Users.View"
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}