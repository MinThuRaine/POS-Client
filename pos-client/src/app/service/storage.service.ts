import { Injectable } from '@angular/core';
import { Internal_connect_Service } from './internal_connect.service';
import { HttpConnectService } from './connect.service';
@Injectable()
export class Storage {
    constructor(private ics: Internal_connect_Service, private http: HttpConnectService) { }
    stor1: any = {
        "err_response":[{"value":"404","caption":"Unauthorize"}],
        "temp_session_store":{"isUse":false,"data":{},"route":""}
    };

    stor2: any = {
        "ref001": [{ "value": "", "caption": "Empty" }]
    };
    stor3: any = { };

  clrTmpSession(){
        this.stor1.temp_session_store = {"isUse":false,"data":{},"route":{}};
    }
} 