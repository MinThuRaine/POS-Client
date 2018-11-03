import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Internal_connect_Service } from '../../service/internal_connect.service';
import { HttpConnectService } from '../../service/connect.service';
import { Storage } from '../../service/storage.service';
import { ClientUtil } from '../../util/client.util';

@Component({
  selector: 'app-role-list',
  template: `
  <div class="animated fadeIn">
  <div class="card">
      <div class="card-header">Role List</div>
      <div class="card-body">
      <form class= "form-horizontal">
        <div style="margin-bottom: 11px;">
            <button (click)="new()" class="btn btn-cus btn-sm btn-primary">New</button>
            <button (click)="search()" class="btn btn-cus btn-sm btn-success">Search</button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let data of obj_list">
                   <td><a (click)="read(data.syskey)">{{data.s1}}</a></td>
                   <td>{{data.s2}}</td>
                </tr>
            </tbody>
        </table>
      </form>
      </div>
      </div>
  </div>
  `
})
export class RoleListComponent {
    sub: any;
    _util: ClientUtil = new ClientUtil();
    src_obj;
    obj_list = [];
    constructor(private ics: Internal_connect_Service, private router: Router, private route: ActivatedRoute, private http: HttpConnectService, private ref: Storage) {
        this.src_obj = this.getDefaultObj();
        this.search();
    }

    new() {
        this.router.navigate(['system/role']);
    }

    search() {
        let url: string = this.ics._apiurl + 'role/search';
        console.log("HELLO " + JSON.stringify(this.src_obj), " URL " + url);
        if (true) {
            this.http.doPost(url, this.src_obj).subscribe(
                data => {
                    this.obj_list = data.responseData.rolelistdata;
                    console.log("DATA " + JSON.stringify(data));
                });
        }
    }

    getDefaultObj() {
        return { "code": "", "description": "", "currentPage": 1, "pageSize": 10 }
    }

    read(d) {
        console.log("LIST D", JSON.stringify(d));
        this.router.navigate(['system/role', d]);
    }
}