import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Internal_connect_Service } from '../../service/internal_connect.service';
import { HttpConnectService } from '../../service/connect.service';
import { Storage } from '../../service/storage.service';
import { ClientUtil } from '../../util/client.util';

@Component({
  selector: 'app-role',
  template: `
  <div class="animated fadeIn">
  <div class="card">
    <div class="card-header">
      Role
    </div>
    <div class="card-body">
      <form class= "form-horizontal" ngNoForm>
        <div style="margin-bottom: 11px;">
            <button (click)="list()" class="btn btn-cus btn-sm btn-success">List</button>
            <button type="button" (click)="save()" class="btn btn-cus btn-sm btn-success">Save</button>
            <button class="btn btn-cus btn-sm btn-success">Post</button>
            <button type="button" (click)="delete()" class="btn btn-cus btn-sm btn-danger">Delete</button>
        </div>

        <div class="row">
          <div class="form-group form-group-sm col-sm-6">
            <div class="row">
                <label class="col-sm-5 ">Code</label>
                <div class="col-sm-7">
                    <input type="text" class="form-control form-control-sm" [(ngModel)]="_obj.s1">
                </div>
            </div>
          </div>

          <div class="form-group form-group-sm col-sm-6">
            <div class="row">
                <label class="col-sm-5 ">Description</label>
                <div class="col-sm-7">
                    <input type="text" class="form-control form-control-sm" [(ngModel)]="_obj.s2">
                </div>
            </div>
          </div>
        </div>

        <div class="form-group ">
            <ul style="list-style: none;">
                <li *ngFor="let headmenu of _menuList,let a=index">
                    
                <i name="plus" *ngIf="headmenu.children.length > 0" (click)="headmenu.show=true"  [hidden]="headmenu.show" class="fa fa-caret-right " style="font-size: 1.8em; line-height: 0.75em; vertical-align: -12%;margin-right: 7px;" ></i>
                <i name="minus" *ngIf="headmenu.children.length > 0" (click)="headmenu.show=false"  [hidden]="!headmenu.show" class="fa fa-caret-down " style="font-size: 1.8em; line-height: 0.75em; vertical-align: -12%;margin-right: 7px;"></i>
                    <label>
                      <input [ngModelOptions]="{standalone: true}" name="checkbox1" (click)="checkParent(headmenu,$event.target.checked,true)"  [(ngModel)]="headmenu.check" type="checkbox">
                      <span class="text-inverse">{{headmenu.check}}-{{headmenu.name}}-{{headmenu.syskey}}</span>
                    </label>

                    <ul style="list-style: none;" *ngIf="headmenu.show">
                        <li [style.padding-left]="middlemenu.children.length>0?'5px':'20px'"  *ngFor="let middlemenu of headmenu.children,let b=index">
                        <i class="fa fa-caret-right " style="font-size: 1.8em; line-height: 0.75em; vertical-align: -12%;margin-right: 7px;"   name="plus" *ngIf="middlemenu.children.length > 0" (click)="middlemenu.show=true"  [hidden]="middlemenu.show"></i>
                        <i class="fa fa-caret-down " style="font-size: 1.8em; line-height: 0.75em; vertical-align: -12%;margin-right: 7px;"   name="minus" *ngIf="middlemenu.children.length > 0" (click)="middlemenu.show=false"  [hidden]="!middlemenu.show"></i>   
                        
                            <label>
                            <input (click)="checkParent(middlemenu,$event.target.checked,true)" [ngModelOptions]="{standalone: true}"  name="checkbox2" type="checkbox" [(ngModel)]="middlemenu.check" >
                            <span name="name" class="text-inverse">{{middlemenu.name}}-{{middlemenu.syskey}}</span>
                            </label>

                            <ul style="list-style: none;"  *ngIf="middlemenu.show">
                                <li style="padding-left: 20px;" *ngFor="let lastmenu of middlemenu.children,let c=index">
                                <div class="checkbox-fade fade-in-primary">
                                    <label>
                                        <input (click)="checkParent(lastmenu,$event.target.checked,true)" [ngModelOptions]="{standalone: true}"  name="checkbox3" [(ngModel)]="lastmenu.check" type="checkbox" >
                                        <span class="text-inverse">{{lastmenu.name}}-{{lastmenu.syskey}}</span>
                                    </label>
                                </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
      </form>
      </div>
      </div>
    </div>
  `
})
export class RoleComponent {

  sub: any;
  _obj = this.getDefaultObj();
  _menuList;
  menuData =[];

  constructor(private incs: Internal_connect_Service, private router: Router, private route: ActivatedRoute, private http: HttpConnectService, private ref: Storage) {
    this._obj = this.getDefaultObj();
    this.callMenuList();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let data = params['data'];
      //console.log("DATA out ",data);
      if (data != null && data != "") {
        console.log("DATA ",data);
       this.read(data);
      }else{
      
      }
    });
  }

  callMenuList(){
    let url: string = this.incs._apiurl + 'menu/menuList';
    if (true) {
      this.http.doGet(url).subscribe(
        data => {
          console.log("DA "+JSON.stringify(data));
        this._menuList = data.responseData.menuData;
        //console.log("MENU ",JSON.stringify(this._menuList));
        });
    }
  }

  newObj() {
    this._obj = this.getDefaultObj();
  }

  checkParent(data,checkVal,isFirst){
        
        if(isFirst){
        data.check=checkVal;
        //this.ioMenuData(checkVal,data.syskey);
        this.checkParentMenu(checkVal,this._menuList,data.parent);
        }
    data.children.forEach(e => {
          e.check = checkVal;
          //this.ioMenuData(checkVal,e.syskey)
          this.checkParent(e,checkVal,false);
      });
  }

  // ioMenuData(isAdd,dataSk){
  //   if(isAdd){
  //       this.menuData.push(dataSk);
  //   }else{
  //       let index = this.menuData.findIndex(x => x === dataSk);
  //       this.menuData.splice(index, 1);
  //   }
  // }

  checkParentMenu(checkVal, menuList, key) {
    menuList.forEach(e => {
      if (e.syskey === key && checkVal) {
        e.check = checkVal;
        if(e.lvl==2 && e.parent!=0){
        this.checkParentMenu(checkVal, menuList, e.parent);
        }else if(e.lvl==2 && e.parent==0){
          e.check = checkVal;
          return;
        }else{
          return;
        }
      } else if (e.syskey === key && checkVal == false) {
        if (!this.confChildChecked(e)) {
          e.check = checkVal;
          if(e.lvl==2 && e.parent!=0){
          this.checkParentMenu(checkVal, menuList, e.parent);
          }else if(e.lvl==2 && e.parent==0){
            e.check = checkVal;
          }else{
            return;
          }
        }
      }
      e.children.forEach(d => {
        
        if (d.syskey === key && checkVal) {
          d.check = checkVal;
          if(d.lvl==2 && d.parent!=0){
          this.checkParentMenu(checkVal, menuList, d.parent);
          }else if(d.lvl==2 && d.parent==0){
            d.check = checkVal;
            return;
          }else{
            return;
          }
         
        } else if (d.syskey === key && checkVal==false) {
          if (!this.confChildChecked(d)) {
            d.check = checkVal;
            if(d.lvl==2 && d.parent!=0){
            this.checkParentMenu(checkVal, menuList, d.parent);
            }else if(d.lvl==2 && d.parent==0){
              d.check = checkVal;
              return;
            }else{
              return;
            }
          }
        }
      });
    });
  }
             
  confChildChecked(data){
      let count = 0;
     // console.log("CONF DataList ",JSON.stringify(data));
      data.children.forEach(e => {
        if(e.check==true){
//console.log("WHO IS that ",JSON.stringify(e));
          count++;
        }
      });
     // console.log("CONFIRM FOR FALSE",count);
      return count>0?true:false;
      
  }

  save() {
    //console.log("DATA ",JSON.stringify(this.menuData));
    let url: string = this.incs._apiurl + 'role/save';
    this.prepareCheckedMenu(this._menuList);
    this._obj.usrKey = this.incs._profile.userSk;
    this._obj.userId = this.incs._profile.userid;
    this._obj.userName = this.incs._profile.userName;
    console.log("ROLE ",JSON.stringify(this._obj.rolemenu));
    if (true) {
      this.http.doPost(url, this._obj).subscribe(
        data => {
          //console.log("DATA "+JSON.stringify(data));
        });
    }
  }

  prepareCheckedMenu(menuList){
    menuList.forEach(e => {
      if(e.check){
        let mdf = {"syskey":e.syskey};
        this._obj.rolemenu.push(mdf);
        console.log("WTH ",JSON.stringify(this._obj.rolemenu));
      }
      this.prepareCheckedMenu(e.children);
    });
  }

  read(key){
    let url: string = this.incs._apiurl + 'role/read/'+key;
    if (true) {
      this.http.doGet(url).subscribe(
        data => {
          this._obj = data.responseData.data;
         
         if(this._menuList!=undefined) 
         this.checkMenuList(this._menuList);
         // console.log("ROLE ",JSON.stringify(this._obj.rolemenu));
        });
    }
  }

  checkMenuList(menuList){
    
    menuList.forEach(e => {
      this._obj.rolemenu.forEach((d,i) => {
        //console.log("ORG ",e.syskey," DAT ",d.syskey);
        if(d.syskey===e.syskey){
          e.check=true;
          this._obj.rolemenu.splice(i, 1);
        }
      });
      this.checkMenuList(e.children);
    });
  }


  delete() {
    let url: string = this.incs._apiurl + 'button/delete/'+this._obj.syskey;
    if (true) {
      this.http.doGet(url).subscribe(
        data => {
          this.newObj();
          //console.log("Delete "+JSON.stringify(data));
        });
    }
  }


  list(){
    this.router.navigate(['system/role-list']);
  }

  getDefaultObj() {
    return { "syskey": "0", "createdDate": "", "modifiedDate": "", "userId": "", "userName": "", "status": 0, "s1": "", "s2": "", "s3": "", "n1": "0", "n2": 0, "n3": "0","usrKey":"0","rolemenu":[] }
  }

}