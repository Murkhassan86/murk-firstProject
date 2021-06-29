
import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}
export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const ADMINMENUITEMS = [
  {
    label: '',
    main: [
      {
        state: 'admin/dashboard',
        short_label: 'A',
        name: 'Admin',
        type: 'link',
        icon: 'icon-Dashboard'
      },
      {
        state: 'admin/signUpRecord',
        short_label: 'A',
        name: 'SignUp Users',
        type: 'link',
        icon: 'icon-Members'
      },
      {
        state: 'admin/calendar',
        short_label: 'A',
        name: 'Calendar',
        type: 'link',
        icon: 'icon-Calander'
      },
      {
        state: 'admin/monitoring',
        short_label: 'M',
        name: 'Monitoring',
        type: 'link',
        icon: 'icon-EnvironmentSmall'
      },
      {
        state: 'admin/userItems',
        short_label: 'UI',
        name: 'Users Items',
        type: 'link',
        icon: 'icon-Archive'
      }
      // {
      //   state: 'logout',
      //   short_label: 'A',
      //   name: 'Logout',
      //   type: 'link',
      //   icon: 'icon-EnvironmentSmall'
      // }
    ]
  }
]

const CLIENTMENUITEMS = [
  {
    label: '',
    main: [
      {
        state: 'admin/bucket',
        short_label: 'A',
        name: 'Bucket',
        type: 'Link',
        icon: 'icon-Barchart'
      },
      {
        state: 'admin/calendar',
        short_label: 'A',
        name: 'Calendar',
        type: 'Link',
        icon: 'icon-Barchart'
      },
      {
        state: 'admin/shopping-cart',
        short_label: 'A',
        name: 'shopping-cart',
        type: 'Link',
        icon: 'icon-Barchart'
      }
      // {
      //   state: 'logout',
      //   short_label: 'A',
      //   name: 'Logout',
      //   type: 'link',
      //   icon: 'icon-EnvironmentSmall'
      // }
      
    ]
  }
]
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  getAll(): Menu[] {
    const role = window.localStorage.getItem('role');
    let menuList: any;
    switch(role) {
      case 'Admin':
        menuList = ADMINMENUITEMS;
        break;
        case 'client':
      menuList = CLIENTMENUITEMS
      // menuList = ADMINMENUITEMS
    }
    return menuList;  
  }

  constructor() { }
}
