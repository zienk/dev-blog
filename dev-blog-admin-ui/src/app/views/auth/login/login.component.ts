import { Component, OnDestroy } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent
} from '@coreui/angular';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { AdminApiAuthApiClient, AuthenticatedResult, LoginRequest } from 'src/app/api/admin-api.service.generated';

import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';
import { UrlConstants } from 'src/app/shared/constants/url.constants';
import { TokenStorageService } from '../../../shared/services/token-storage.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, ReactiveFormsModule]
})
export class LoginComponent implements OnDestroy {
  
  loginForm: FormGroup;
  private ngUnsubscribe = new Subject<void>();
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authApiClient: AdminApiAuthApiClient,
    private alertService: AlertService,
    private router: Router,
    private tokenService: TokenStorageService
  ) {
    this.loginForm = this.fb.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  login() {
    this.loading = true;
    var request: LoginRequest = new LoginRequest({
      username: this.loginForm.controls['userName'].value,
      password: this.loginForm.get('password')?.value
    });

    this.authApiClient.login(request)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe({
      next: (res: AuthenticatedResult) => {
        //Save token and refresh token to localstorage
        this.tokenService.saveToken(res.token);
        this.tokenService.saveRefreshToken(res.refreshToken);
        this.tokenService.saveUser(res);
        //Redirect to dashboard
        this.router.navigate([UrlConstants.HOME]);
      },
      error: (error: any) => {
        // Handle error
        console.error('Login error:', error);
        this.alertService.showError('Login failed. Please try again.');
        this.loading = false;
      },

    });
  }
}
