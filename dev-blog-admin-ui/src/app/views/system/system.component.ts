import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SystemRoutingModule } from './system-routing.module';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './roles/role.component';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'primeng/api';
import { RolesDetailComponent } from './roles/roles-detail.component';
import { DevBlogSharedModule } from '../../shared/modules/devblog-shared.module';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PermissionGrantComponent } from './roles/permission-grant.component';

@NgModule({
  imports: [
    SystemRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ProgressSpinnerModule,
    BlockUIModule,
    PaginatorModule,
    PanelModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    SharedModule,
    DevBlogSharedModule,
    KeyFilterModule
  ],
  declarations: [
    UserComponent,
    RoleComponent,
    RolesDetailComponent,
    PermissionGrantComponent
  ]
})
export class SystemModule {
}