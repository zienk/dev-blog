import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
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

import {ADMIN_API_BASE_URL} from './api/admin-api.service.generated'
import { AdminApiAuthApiClient, AdminApiPostApiClient } from './api/admin-api.service.generated';
import { environment } from '../environments/environments';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { AlertService } from './shared/services/alert.service';
import { TokenStorageService } from './shared/services/token-storage.service';
import { AuthGuard } from './shared/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ADMIN_API_BASE_URL, useValue: environment.API_URL},
    provideHttpClient(),
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
    AuthGuard
  ]
};
