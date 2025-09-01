import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Home page',  
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    },
    attributes: {
      "policyName": "Permissions.Dashboard.View"
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
        attributes: {
        "policyName": "Permissions.Posts.View"
    }
      },
      {
        name: 'Series',
        url: '/content/series',
        attributes: {
          "policyName": "Permissions.Series.View"
        }
      },
      {
        name: 'Author’s fee',
        url: '/content/royalty',
        attributes: {
          "policyName": "Permissions.Loyalty.View"
        }
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
        attributes: {
          "policyName": "Permissions.Roles.View"
        }
      },
      {
        name: 'User',
        url: '/system/users',
        attributes: {
          "policyName": "Permissions.Users.View"
        }
      },
    ]
  },
];
