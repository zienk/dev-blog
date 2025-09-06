import { Component } from '@angular/core';
import { AdminApiTestApiClient } from '../../../api/admin-api.service.generated';
import { TokenStorageService } from '../../../shared/services/token-storage.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent {
  constructor(private testApiClient: AdminApiTestApiClient) {}
  test() {
    this.testApiClient.testAuthen().subscribe({
      next: () => {
        console.log('Test authen oke');
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}