import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SystemRoutingModule } from './system-routing.module';
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
import { RoleDetailComponent } from './roles/role-detail.component';
import { DevBlogSharedModule } from '../../shared/modules/devblog-shared.module';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PermissionGrantComponent } from './roles/permission-grant.component';
import { ChangeEmailComponent } from './user/change-email.component';
import { RoleAssignComponent } from './user/role-assign.component';
import { SetPasswordComponent } from './user/set-password.component';
import { BadgeModule } from 'primeng/badge';
import { PickListModule } from 'primeng/picklist';
import { ImageModule } from 'primeng/image';

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
    KeyFilterModule,
    BadgeModule,
    PickListModule,
    ImageModule
  ],
  providers: [DatePipe, DecimalPipe],
  declarations: [
    RoleComponent,
    RoleDetailComponent,
    PermissionGrantComponent,
    ChangeEmailComponent,
    RoleAssignComponent,
    SetPasswordComponent
  ]
})
export class SystemModule {
}