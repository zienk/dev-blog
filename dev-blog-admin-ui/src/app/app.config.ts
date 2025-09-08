import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';

import {ADMIN_API_BASE_URL, AdminApiRoleApiClient, AdminApiTestApiClient, AdminApiTokenApiClient} from './api/admin-api.service.generated'
import { AdminApiAuthApiClient, AdminApiPostApiClient } from './api/admin-api.service.generated';
import { environment } from '../environments/environments';
import { ConfirmationService, MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { AlertService } from './shared/services/alert.service';
import { TokenStorageService } from './shared/services/token-storage.service';
import { AuthGuard } from './shared/auth.guard';

import { TokenInterceptor } from './shared/interceptors/token.interceptors';
import { GlobalHttpInterceptorService } from './shared/interceptors/error-handler.interceptor';
import { DialogService } from 'primeng/dynamicdialog';
import { UtilityService } from './shared/services/utility.service';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    { provide: ADMIN_API_BASE_URL, useValue: environment.API_URL},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptorService,
      multi: true,
    },
    
    AdminApiAuthApiClient,
    AdminApiPostApiClient,
    provideRouter(routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    importProvidersFrom(SidebarModule, DropdownModule),
    IconSetService,
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    MessageService,
    AlertService,
    TokenStorageService,
    AuthGuard,
    AdminApiTestApiClient,
    AdminApiTokenApiClient,
    AdminApiRoleApiClient,
    DialogService,
    ConfirmationService,
    UtilityService
  ]
};
