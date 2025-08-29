import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Home page',  
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Content',
    url: '/content',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Categories',
        url: '/content/post-categories',
      },
      {
        name: 'Post',
        url: '/content/posts',
      },
      {
        name: 'Series',
        url: '/content/series',
      },
      {
        name: 'Author’s fee',
        url: '/content/royalty',
      },
    ]
  },
  {
    name: 'System',
    url: '/system',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Roles',
        url: '/system/roles',
      },
      {
        name: 'User',
        url: '/system/users',
      },
    ]
  },
];
