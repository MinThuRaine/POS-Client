import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { UserListComponent } from './user-list.component';

import { MenuComponent } from './menu.component'
import { MenuListComponent } from './menu-list.component';

import { RoleComponent} from './role.component';
import { RoleListComponent } from './role-list.component';

const routes: Routes = [
    {
      path: '',
      data: {
        title: 'System'
      },
      children: [
        {
          path: 'user',
          component: UserComponent,
          data: {
            title: 'User'
          }
        },
        {
          path: 'user/:data',
          component: UserComponent,
          data: {
            title: 'User'
          }
        },
        {
          path: 'user-list',
          component: UserListComponent,
          data: {
            title: 'User List'
          }
        },
        {
          path: 'menu',
          component: MenuComponent,
          data: {
            title: 'Menu'
          }
        },
        {
          path: 'menu/:data',
          component: MenuComponent,
          data: {
            title: 'Menu'
          }
        },
        {
          path: 'menu-list',
          component: MenuListComponent,
          data: {
            title: 'Menu List'
          }
        },
        {
          path: 'role',
          component: RoleComponent,
          data: {
            title: 'Role'
          }
        },
        {
          path: 'role/:data',
          component: RoleComponent,
          data: {
            title: 'Role'
          }
        },
        {
          path: 'role-list',
          component: RoleListComponent,
          data: {
            title: 'Role List'
          }
        }
      ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SystemRoutingModule {}