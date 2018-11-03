import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Internal_connect_Service } from '../../service/internal_connect.service';
import { HttpConnectService } from '../../service/connect.service';
import { Storage } from '../../service/storage.service';

@Component({
  selector: 'app-user',
  template: `
  <div class="animated fadeIn">
  <div class="card">
    <div class="card-header">
      User
    </div>
    <div class="card-body">
        <form class="form-horizontal" ngNoForm>
            <div style="margin-bottom: 11px;">
                <button (click)="list()" class="btn btn-cus btn-sm btn-success">List</button>
                <button type="button" (click)="save()" class="btn btn-cus btn-sm btn-success">Save</button>
                <button class="btn btn-cus btn-sm btn-success">Post</button>
                <button type="button" (click)="delete()" class="btn btn-cus btn-sm btn-danger">Delete</button>
            </div>
            <div class="row">
                <div class="form-group  col-sm-6">
                    <div class="row">
                        <label class="col-sm-5 ">User Id</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control form-control-sm" [(ngModel)]="_obj.userId">
                        </div>
                    </div>
                </div>
                <div class="form-group  col-sm-6">
                    <div class="row">
                        <label  class="col-sm-5 ">User Name</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control form-control-sm" [(ngModel)]="_obj.s2">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="form-group  col-sm-6">
                    <div class="row">
                        <label class="col-sm-5 ">PIN Code</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control form-control-sm" [(ngModel)]="_obj.s4">
                        </div>
                    </div>
                </div>
                <div class="form-group col-sm-6">
                    <div class="row">
                        <label class="col-sm-5 ">Confirm PIN CODE</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control form-control-sm"  [(ngModel)]="confpin">
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="row">
                <div class="form-group col-sm-6">
                    <div class="row">
                        <label class="col-sm-5">Password</label>
                        <div class="col-sm-7">
                        <input type="text" class="form-control form-control-sm" [(ngModel)]="_obj.s1">
                        </div>
                    </div>
                </div>
                <div class="form-group  col-sm-6">
                    <div class="row">
                        <label class="col-sm-5">Confirm Password</label>
                        <div class="col-sm-7">
                        <input type="text" class="form-control form-control-sm" [(ngModel)]="confpwd">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <div class="row">
                        <label class="col-sm-5">Email</label>
                        <div class="col-sm-7">
                        <input type="text" class="form-control form-control-sm" [(ngModel)]="_obj.s3">
                        </div>
                    </div>
                </div>
                <div class="form-group col-sm-6">
                    <div class="row">
                        <label class="col-sm-5">Address</label>
                        <div class="col-sm-7">
                            <textarea class="form-control form-control-sm" [(ngModel)]="_obj.s6"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <div class="row">
                        <label class="col-sm-5">Role</label>
                        <div class="col-sm-7">
                            <select  [(ngModel)]="_obj.n3" class="select_control form-control form-control-sm">
                                <option *ngFor="let data of roleList" value="{{data.n1}}">{{data.s2}}</option>
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

//<option *ngFor="let data of roleList" value="{{data.n1}}">{{data.s2}}</option>

export class UserComponent {
    sub: any;
    _obj = this.getDefaultObj();
    confpwd = "";
    roleList = [];
    confpin = "";
    constructor(private router:Router,private incs: Internal_connect_Service, private route: ActivatedRoute, private http: HttpConnectService, private ref: Storage) { 
        this._obj = this.getDefaultObj();
        this.getOptRoleList();
    }

    list(){
        this.router.navigate(['system/user-list']);
      }

      ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
          let data = params['data'];
          console.log("DATA out ",data);
          if (data != null && data != "") {
            console.log("DATA ",data);
            this.read(data);
          }
        });
      }
    
      newObj() {
        this._obj = this.getDefaultObj();
      }
    
      getOptRoleList(){
        let url: string = this.incs._apiurl + 'role/optrole';
        if (true) {
        this._obj.userId = this.incs._profile.userid;
          this.http.doGet(url).subscribe(
            data => {
             this.roleList = data.responseData.rolesdata;
             console.log("ROLE ",JSON.stringify(this.roleList));
             this._obj.n3=this.roleList[0].n1;
            });
        }
      }
    
      save() {
        let url: string = this.incs._apiurl + 'user/save';
        this._obj.psyskey = this.incs._profile.userSk;
        this._obj.userName = this.incs._profile.userName;
        if (true) {
        this._obj.userId = this.incs._profile.userid;
          this.http.doPost(url, this._obj).subscribe(
            data => {
              console.log("DATA "+JSON.stringify(data));
            });
        }
      }
    
      read(d){
        let url: string = this.incs._apiurl + 'user/read/'+d;
        if (true) {
          this.http.doGet(url).subscribe(
            data => {
              this._obj =data.responseData.userData;
              this.confpwd= this._obj.s1;
              this.confpin = this._obj.s4;
            });
        }
      }
    
      delete() {
          console.log("tSYSKEY ",this._obj.syskey);
        let url: string = this.incs._apiurl + 'user/delete/'+this._obj.syskey;
        if (true) {
          this.http.doGet(url).subscribe(
            data => {
              this.newObj();
            });
        }
      }
    
      getDefaultObj() {
        return {"syskey":"0","createdDate":"","modifiedDate":"","userId":"","userName":"","status":0,"usersyskey":"0","s1":"","s2":"","s3":"","s4":"","s5":"","s6":"","s7":"","n1":"0","n2":"0","n3":"0","n4":"0","n5":0,"n6":0,"n7":0,"n8":0,"person":{"syskey":"0","createdDate":"","modifiedDate":"","userId":"","userName":"","recordStatus":0,"syncStatus":0,"syncBatch":0,"usersyskey":0,"t1":"","t2":"","t3":"","t4":"","t5":"","t6":"","t7":"","t8":"","t9":"","t10":"","t11":"","t12":"","t13":"","t14":"","t15":"","t16":"","t17":"","t18":"","t19":"","t20":"","t21":"","t22":"","t23":"","t24":"","n1":0,"n2":0,"n3":0,"n4":0,"n5":0,"n6":0,"n7":0,"n8":0,"n9":0,"n10":0},"psyskey":"0"};
      }
}
