import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogComponent } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { ChangeEmailComponent } from './change-email.component';
import { RoleAssignComponent } from './role-assign.component';
import { SetPasswordComponent } from './set-password.component';
import { UserDetailComponent } from './user-detail.component';
import { AdminApiUserApiClient, UserDto, UserDtoPagedResult } from '../../../api/admin-api.service.generated';
import { AlertService } from '../../../shared/services/alert.service';
import { MessageConstants } from '../../../shared/constants/messages.constant';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'app-user',
    templateUrl: 'user.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        PanelModule,
        ButtonModule,
        InputTextModule,
        PaginatorModule,
        BlockUIModule,
        ProgressSpinnerModule,
        BadgeModule,
        DatePipe,
        DecimalPipe
    ],
    providers: [DatePipe, DecimalPipe]
})
export class UserComponent implements OnInit, OnDestroy {
    //System variables
    private ngUnsubscribe = new Subject<void>();
    public blockedPanel: boolean = false;

    //Paging variables
    public pageIndex: number = 1;
    public pageSize: number = 10;
    public totalCount: number;

    //Business variables
    public items: UserDto[];
    public selectedItems: UserDto[] = [];
    public keyword: string = '';

    constructor(
        private userService: AdminApiUserApiClient,
        public dialogService: DialogService,
        private alertService: AlertService,
        private confirmationService: ConfirmationService,
        public datePipe: DatePipe,
        public decimalPipe: DecimalPipe
    ) {}

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    ngOnInit() {
        this.loadData();
    }

    loadData(selectionId: string | null = null) {
        this.toggleBlockUI(true);
        this.userService
            .getAllUsersPaging(this.keyword, this.pageIndex, this.pageSize)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe({
                next: (response: UserDtoPagedResult) => {
                    this.items = response.results ?? [];
                    this.totalCount = response.rowCount ?? 0;
                    if (selectionId != null && this.items.length > 0) {
                        this.selectedItems = this.items.filter(
                            (x) => x.id == selectionId
                        );
                    }

                    this.toggleBlockUI(false);
                },
                error: () => {
                    this.toggleBlockUI(false);
                },
            });
    }

    showAddModal() {
        const ref = this.dialogService.open(UserDetailComponent, {
            header: 'Thêm mới người dùng',
            width: '70%',
        });
        const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
        const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
        const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
        dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
        ref.onClose.subscribe((data: UserDto) => {
            if (data) {
                this.alertService.showSuccess(
                    MessageConstants.CREATED_OK_MSG
                );
                this.selectedItems = [];
                this.loadData();
            }
        });
    }

    pageChanged(event: any): void {
        this.pageIndex = event.page;
        this.pageSize = event.rows;
        this.loadData();
    }

    showEditModal() {
        if (this.selectedItems.length == 0) {
            this.alertService.showError(
                MessageConstants.NOT_CHOOSE_ANY_RECORD
            );
            return;
        }
        var id = this.selectedItems[0].id;
        const ref = this.dialogService.open(UserDetailComponent, {
            data: {
                id: id,
            },
            header: 'Cập nhật người dùng',
            width: '70%',
        });
        const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
        const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
        const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
        dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
        ref.onClose.subscribe((data: UserDto) => {
            if (data) {
                this.alertService.showSuccess(
                    MessageConstants.UPDATED_OK_MSG
                );
                this.selectedItems = [];
                this.loadData(data.id || null);
            }
        });
    }

    deleteItems() {
        if (this.selectedItems.length == 0) {
            this.alertService.showError(
                MessageConstants.NOT_CHOOSE_ANY_RECORD
            );
            return;
        }
        var ids: string[] = [];
        this.selectedItems.forEach((element) => {
            if (element.id) {
                ids.push(element.id);
            }
        });
        this.confirmationService.confirm({
            message: MessageConstants.CONFIRM_DELETE_MSG,
            accept: () => {
                this.deleteItemsConfirm(ids);
            },
        });
    }

    deleteItemsConfirm(ids: any[]) {
        this.toggleBlockUI(true);
        this.userService.deleteUsers(ids).subscribe({
            next: () => {
                this.alertService.showSuccess(
                    MessageConstants.DELETED_OK_MSG
                );
                this.loadData();
                this.selectedItems = [];
                this.toggleBlockUI(false);
            },
            error: () => {
                this.toggleBlockUI(false);
            },
        });
    }

    setPassword(id: string) {
        const ref = this.dialogService.open(SetPasswordComponent, {
            data: {
                id: id,
            },
            header: 'Đặt lại mật khẩu',
            width: '70%',
        });
        const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
        const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
        const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
        dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
        ref.onClose.subscribe((result: boolean) => {
            if (result) {
                this.alertService.showSuccess(
                    MessageConstants.CHANGE_PASSWORD_SUCCCESS_MSG
                );
                this.selectedItems = [];
                this.loadData();
            }
        });
    }
    changeEmail(id: string) {
        const ref = this.dialogService.open(ChangeEmailComponent, {
            data: {
                id: id,
            },
            header: 'Đặt lại email',
            width: '70%',
        });
        const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
        const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
        const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
        dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
        ref.onClose.subscribe((result: boolean) => {
            if (result) {
                this.alertService.showSuccess(
                    MessageConstants.CHANGE_EMAIL_SUCCCESS_MSG
                );
                this.selectedItems = [];
                this.loadData();
            }
        });
    }
   
    
    assignRole(id: string) {
        const ref = this.dialogService.open(RoleAssignComponent, {
            data: {
                id: id,
            },
            header: 'Gán quyền',
            width: '70%',
        });
        const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
        const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
        const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
        dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
        ref.onClose.subscribe((result: boolean) => {
            if (result) {
                this.alertService.showSuccess(
                    MessageConstants.ROLE_ASSIGN_SUCCESS_MSG
                );
                this.loadData();
            }
        });
    }

    private toggleBlockUI(enabled: boolean) {
        if (enabled == true) {
            this.blockedPanel = true;
        } else {
            setTimeout(() => {
                this.blockedPanel = false;
            }, 1000);
        }
    }
}