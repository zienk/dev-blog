import { Component } from '@angular/core';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authApiClient: AdminApiAuthApiClient,
    private alertService: AlertService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  login() {
    var request: LoginRequest = new LoginRequest({
      username: this.loginForm.controls['userName'].value,
      password: this.loginForm.get('password')?.value
    });

    this.authApiClient.login(request).subscribe({
      next: (res: AuthenticatedResult) => {
        //Save token and refresh token to localstorage

        //Redirect to dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        // Handle error
        console.error('Login error:', error);
        this.alertService.showError('Login failed. Please try again.');
      },

    });
  }
}
