import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/auth.guard';
import { RoleComponent } from './roles/role.component';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'users',
      pathMatch: 'full',
    },
    {
      path: 'users',
      loadComponent: () => import('./user/user.component').then(c => c.UserComponent),
      data: {
        title: 'Users',
        requiredPolicy: "Permissions.Users.View"
      },
      canActivate: [AuthGuard]
    },
    {
      path: 'roles',
      component: RoleComponent,
      data: {
        title: 'Roles',
        requiredPolicy: "Permissions.Roles.View"
      },
      canActivate: [AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule {}