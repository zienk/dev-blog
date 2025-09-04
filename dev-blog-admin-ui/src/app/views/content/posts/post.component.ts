import { Component } from '@angular/core';
import { AdminApiTestApiClient } from '../../../api/admin-api.service.generated';
import { TokenStorageService } from '../../../shared/services/token-storage.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent {

  constructor(
    private testApiClient: AdminApiTestApiClient,
    private tokenStorageService: TokenStorageService
  ) { }

  test() {
    // Debug: Check if token exists
    const token = this.tokenStorageService.getToken();
    console.log('Current token:', token);
    
    if (!token) {
      console.log('No token found in local storage');
      return;
    }

    this.testApiClient.testAuthen().subscribe({
      next: () => {
        console.log('Test Auth successful');
      },
      error: (error: any) => {
        console.log('Test Auth error:', error);
      }
    });
  }

}