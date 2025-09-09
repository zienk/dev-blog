import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { AdminApiUserApiClient, UserDto } from '../../../api/admin-api.service.generated';
import { CommonModule } from '@angular/common';

// PrimeNG Imports
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';

// Shared Components
import { ValidationMessageComponent } from '../../../shared/modules/validation-message/validation-message.component';

@Component({
  selector: 'app-change-email',
  templateUrl: 'change-email.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PanelModule,
    InputTextModule,
    KeyFilterModule,
    BlockUIModule,
    ProgressSpinnerModule,
    ButtonModule,
    ValidationMessageComponent
  ]
})
export class ChangeEmailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  // Default
  public blockedPanelDetail: boolean = false;
  public form: FormGroup;
  public title: string;
  public btnDisabled = false;
  public saveBtnName: string;
  public closeBtnName: string;
  public email: string;
  formSavedEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private userService: AdminApiUserApiClient,
    private fb: FormBuilder
  ) {}

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    this.buildForm();
    this.loadDetail(this.config.data.id);
    this.saveBtnName = 'Cập nhật';
    this.closeBtnName = 'Hủy';
  }

  // Validate
  noSpecial: RegExp = /^[^<>*!_~]+$/;
  validationMessages = {
    email: [
      { type: 'required', message: 'Bạn phải nhập email' },
      { type: 'email', message: 'Email không đúng định dạng' },
    ],
  };

  loadDetail(id: any) {
    this.toggleBlockUI(true);
    this.userService
      .getUserById(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: UserDto) => {
          this.email = response.email ?? '';
          this.buildForm();
          this.toggleBlockUI(false);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }
  saveChange() {
    this.toggleBlockUI(true);

    this.saveData();
  }

  private saveData() {
    this.userService
      .changeEmail(this.config.data.id, this.form.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.toggleBlockUI(false);
        this.ref.close(this.form.value);
      });
  }

  buildForm() {
    this.form = this.fb.group({
      email: new FormControl(
        this.email || null,
        Validators.compose([Validators.required, Validators.email])
      ),
    });
  }

  private toggleBlockUI(enabled: boolean) {
    if (enabled == true) {
      this.btnDisabled = true;
      this.blockedPanelDetail = true;
    } else {
      setTimeout(() => {
        this.btnDisabled = false;
        this.blockedPanelDetail = false;
      }, 1000);
    }
  }
}