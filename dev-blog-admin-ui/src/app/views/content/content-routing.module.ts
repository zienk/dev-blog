import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full',
  },
  {
    path: 'posts',
    loadComponent: () => import('./posts/post.component').then(m => m.PostComponent),
    data: {
      title: 'Posts',
      requiredPolicy: "Permissions.Posts.View"
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'post-categories',
    loadComponent: () => import('./post-categories/post-category.component').then(m => m.PostCategoryComponent),
    data: {
      title: 'Categories',
      requiredPolicy: "Permissions.PostCategories.View"
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}