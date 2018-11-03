import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Internal_connect_Service } from '../../service/internal_connect.service';
import { HttpConnectService } from '../../service/connect.service';
import { Storage } from '../../service/storage.service';
import { ClientUtil } from '../../util/client.util';

@Component({
  selector: 'app-menu',
  template: `
  <div class="animated fadeIn">
  <div class="card">
    <div class="card-header">
      Menu
    </div>
    <div class="card-body">
    <form class="form-horizontal" ngNoForm>
        <div style="margin-bottom: 11px;">
            <button (click)="list()" class="btn btn-cus btn-sm btn-success">List</button>
            <button type="button" (click)="save()" class="btn btn-cus btn-sm btn-success">Save</button>
            <button class="btn btn-cus btn-sm btn-success">Post</button>
            <button type="button" (click)="delete()" class="btn btn-cus btn-sm btn-danger">Delete</button>
        </div>

        <div>
        <label style="margin: 3px 12px 14px 0px;"><input type="radio" name="type" [(ngModel)]="_obj.n1" value="1"> Main Menu</label>
        <label style="margin: 3px 12px 14px 0px;"><input type="radio" name="type" [(ngModel)]="_obj.n1" value="2"> Sub Menu</label>
        <label style="margin: 3px 12px 14px 0px;"><input type="radio" name="type" [(ngModel)]="_obj.n1" value="3"> Child Menu</label>
        </div>
        <div class="row">
            <div class="form-group form-group-sm col-sm-6">
                <div class="row">
                    <label class="col-sm-5 ">Description</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control form-control-sm" [(ngModel)]="_obj.s1">
                    </div>
                </div>
            </div>
            <div class="form-group form-group-sm col-sm-6">
                <div class="row">
                    <label  class="col-sm-5 ">Icon</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control form-control-sm" [(ngModel)]="_obj.s2">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-group form-group-sm col-sm-6">
                <div class="row">
                    <label class="col-sm-5 ">State</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control form-control-sm" [(ngModel)]="_obj.s3">
                    </div>
                </div>
            </div>
            <div *ngIf="_obj.n1!=1" class="form-group form-group-sm col-sm-6">
                <div class="row">
                    <label class="col-sm-5 ">Parent Menu</label>
                    <div class="col-sm-7">
                        <select  [(ngModel)]="_obj.n2" class="select_control form-control input-sm">
                        <option *ngFor="let data of p_menu_list" value="{{data.s1}}">{{data.s2}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div *ngIf="_obj.n1==1" class="form-group form-group-sm col-sm-6">
                <div class="row">
                    <label class="col-sm-5 ">Label</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control form-control-sm"  [(ngModel)]="_obj.s4">
                    </div>
                </div>
            </div>
        </div>
        <div class="row" *ngIf="_obj.n1!=2">
             <div class="form-group form-group-sm col-sm-6">
                <div class="row">
                    <label class="col-sm-5 ">Open New Tab</label>
                    <div class="col-sm-7">
                        <select  [(ngModel)]="_obj.n5" class="select_control form-control input-sm">
                        <option value="1">True</option>
                        <option value="0">False</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
</form>
</div>
  </div>
</div>
  `
})
export class MenuComponent {

    sub: any;
    _util: ClientUtil = new ClientUtil();
    _obj = this.getDefaultObj();
    p_menu_list = [];
    constructor(private ics: Internal_connect_Service, private router: Router, private route: ActivatedRoute, private http: HttpConnectService, private ref: Storage) {
        this._obj = this.getDefaultObj();
        this.callMenuList();
  
    }
  
    callMenuList(){
      let url: string = this.ics._apiurl + 'menu/menuList';
      if (true) {
        this.http.doGet(url).subscribe(
          data => {
           console.log("DATA ",JSON.stringify(data));
          });
      }
    }
  
    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        this.getPMenuList();
        let data = params['data'];
        if (data != null && data != "") {
          this.read(data);
        }
      });
    }
  
    getPMenuList(){
      let url: string = this.ics._apiurl + 'menu/optmenu';
      if (true) {
      this._obj.userId = this.ics._profile.userid;
        this.http.doGet(url).subscribe(
          data => {
           this.p_menu_list = data.responseData.mainmenudatas;
          });
      }
    }
  
    newObj() {
      this._obj = this.getDefaultObj();
    }
  
    save() {
      let url: string = this.ics._apiurl + 'menu/save';
      this._obj.usersyskey = this.ics._profile.userSk;
      this._obj.userName ="";// this.ics._profile.userName;
      if (true) {
      this._obj.userId = this.ics._profile.userid;
        this.http.doPost(url, this._obj).subscribe(
          data => {
          this.getPMenuList();
            console.log("DATA "+JSON.stringify(data));
          });
      }
    }
  
    list(){
      this.router.navigate(['system/menu-list']);
    }
  
    read(d){
      let url: string = this.ics._apiurl + 'menu/read/'+d;
      if (true) {
        this.http.doGet(url).subscribe(
          data => {
            this._obj = data.responseData.userData;
            this._obj.n1 = data.responseData.userData.n1+"";
            console.log(this._obj.n5);
            console.log("DATA "+JSON.stringify(data));
          });
      }
    }
  
    delete() {
      let url: string = this.ics._apiurl + 'menu/delete/'+this._obj.syskey;
      if (true) {
        this.http.doGet(url).subscribe(
          data => {
            this.newObj();
            console.log("Delete "+JSON.stringify(data));
          });
      }
    }
  
    getDefaultObj() {
      return {"syskey":"","createdDate":"","modifiedDate":"","userId":"","userName":"","status":0,"usersyskey":"","s1":"","s2":"","s3":"","s4":"","s5":"","s6":"","s7":"","n1":"1","n2":"0","n3":"0","n4":0,"n5":0,"n6":"0","n7":0};
    }
  
  }