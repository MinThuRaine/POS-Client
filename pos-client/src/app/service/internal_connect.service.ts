import {Injectable} from '@angular/core'
import {Subject}    from 'rxjs';
declare var jQuery: any;
@Injectable()
export class Internal_connect_Service {
    private _mybean: any;
    _authurl: string ="";
    _apiurl: string ="";
    _title: string = "";
    _domain: string = "awba";
    _key = "";
    _ref_key = "";
    _token = "";
    _ref_token = "";
    _bpType = {
        "DL":0,
        "SDL":1,
        "DP":2
    };
    private isUserInside = false;
    _dpCode: string = "D";
    _AMCode: string = "AM";
    _app: string = "";
    _appname: string = "";
    _orgId : string =  "X/R7RWTBdWsCp/VtkbqPKg==";
    _authorization : string = "";
    _profile = {
        "userSk" : "0",
        "u12Sk" : "0",
        "userName": "?",
        "role": 0,
        "logoText": "AG2",
        "logoLink": "/frm000",
        "commandCenter": "true",
        "btndata": [],
        "menus": [],
        "rightMenus": [],
        "userid": "",
        "t1" : "",
        "n1": 10,
    };
    _datepickerOpts = {
        autoclose: true,
        todayBtn: 'linked',
        todayHighlight: true,
        assumeNearbyYear: true,
        placeholder: 'dd/mm/yyyy', 
        format: 'dd/mm/yyyy'
    }

    setisUserExit(data){
        this.isUserInside = data;
    }

    getisUserExit(){
        return this.isUserInside;
    }

    _source = new Subject<any>();
    _obs = this._source.asObservable();

  
    sendReq(x: any) {
        this._source.next(x);
    }
   
}