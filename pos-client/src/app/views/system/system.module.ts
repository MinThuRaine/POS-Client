import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';


import { SystemRoutingModule } from './system-routing.module';

import { UserComponent } from './user.component';
import { UserListComponent } from './user-list.component';

import { MenuComponent} from './menu.component';
import { MenuListComponent } from './menu-list.component';

import { RoleComponent} from './role.component';
import { RoleListComponent } from './role-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SystemRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [
    UserComponent,
    UserListComponent,
    MenuComponent,
    MenuListComponent,
    RoleComponent,
    RoleListComponent
  ]
})
export class SystemModule { }
