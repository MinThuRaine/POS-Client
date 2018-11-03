import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpConnectService } from '../app/service/connect.service';
import { Storage } from '../app//service/storage.service';
import { Internal_connect_Service } from '../app/service/internal_connect.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private stor:Storage,private incs:Internal_connect_Service,private http: HttpConnectService,private router: Router) { 
    this.callInit();
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  callInit(){
    this.http.doGet('/assets/json/config.json?random=' + Math.random()).subscribe(
      data => {
        console.log("READDDDDDDDDDD ",JSON.stringify(data));
        this.incs._title =data.title;
        this.incs._app = data.app;
        this.incs._appname = data.appname;
        this.incs._apiurl = data.apiurl;
        this.incs._authurl = data.authurl;
        this.incs._key = data.key;
        this.incs._ref_key = data.refkey;
      });
  }

}
