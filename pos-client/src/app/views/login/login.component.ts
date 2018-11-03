import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Internal_connect_Service } from '../../service/internal_connect.service';
import { ClientUtil } from '../../util/client.util';
import { HttpConnectService } from '../../service/connect.service';
import { Storage } from '../../service/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 

  url = "";
  show_password = true;
  err_msg ={"msg":"","show":false};
  authPass =  false;
  logindata = { "username": "", "password": "" };
  subscribe: any;
  constructor(private store:Storage,private route: ActivatedRoute,private incs: Internal_connect_Service, private http: HttpConnectService, private router: Router, private util: ClientUtil) {
    console.log("CONSTRU "+this.store.stor1.temp_session_store.route.url);
  }

  goPost(url) {
    if(1===1){
    this.url = this.incs._authurl + url;
    this.http.doPostLogIn(this.url, this.logindata).subscribe(
      data => {
        console.log("DATA ", JSON.stringify(data));
        this.util.setCookie("wk_tkn", data.token);
        this.util.setCookie("rs_tkn", data.tkn);
        this.incs.setisUserExit(true);
      },
      err=>{
     
      }
    );
  }else{

  }
  }

}
