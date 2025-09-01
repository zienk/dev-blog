import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems } from './_nav';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { Router } from '@angular/router';
import { UrlConstants } from '../../shared/constants/url.constants';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ContainerComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    IconDirective,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective
  ]
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = [...navItems];

  constructor(
    private tokenService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.tokenService.getUser();
    if (user == null) {
      this.router.navigate([UrlConstants.LOGIN]);
      return;
    }
    
    // Nếu user có permissions thì xử lý, nếu không thì hiển thị tất cả
    if (user.permissions) {
      try {
        const permissions = JSON.parse(user.permissions);
        
        for (let index = 0; index < navItems.length; index++) {
          if (navItems[index].children) {
            for (let childIndex = 0; childIndex < navItems[index].children!.length; childIndex++) {
              const childItem = navItems[index].children![childIndex];
              
              // Kiểm tra nếu child item có attributes và policyName
              if (childItem.attributes && childItem.attributes['policyName']) {
                const hasPermission = permissions.some((permission: string) => 
                  permission === childItem.attributes!['policyName']
                );
                
                if (!hasPermission) {
                  childItem.class = 'hidden';
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Error parsing user permissions:', error);
      }
    }
    
    this.navItems = [...navItems];
  }
}
