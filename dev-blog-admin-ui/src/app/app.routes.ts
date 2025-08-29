import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./views/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '',
    loadComponent: () => import('./layout').then(m => m.DefaultLayoutComponent),
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard-routing.module').then((m) => m.DashboardRoutingModule)
      },
      {
        path: 'content',
        loadChildren: () => import('./views/content/content-routing.module').then((m) => m.ContentRoutingModule)
      },
      {
        path: 'system',
        loadChildren: () => import('./views/system/system-routing.module').then((m) => m.SystemRoutingModule)
      },
      
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
