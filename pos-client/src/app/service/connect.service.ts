import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions, Jsonp } from '@angular/http';
import { Internal_connect_Service } from './internal_connect.service';
import { ClientUtil } from '../util/client.util';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { Observable,of } from '../../../node_modules/rxjs';

declare function saveAs(b, f);
@Injectable()
export class HttpConnectService {
    _util: ClientUtil = new ClientUtil();
    constructor(private http: Http, private ics: Internal_connect_Service, private httpClient: HttpClient) {
    }

    getJson(url: string) {
        return this.http.get(url).pipe(map(res => res.json()));
    }

    doGet(url: string): Observable<any> {
        const headers = this.getAuthToken(false);
        return this.httpClient.get(url, { headers: headers }).pipe(
            map((res: Response) => res))
    }

    doGetHttp(url:string): Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' 
            ,'Authorization':this.getAuthToken(false)})
          };
          return this.httpClient.get(url,httpOptions).pipe(
            map((res: Response) => res.json()));
    }

    
    doPostHttp(url: string,j: any): Observable<any> {
        var params = JSON.stringify(j);
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' 
            ,'Authorization':this.getAuthToken(false)})
          };
        return this.httpClient.post(url,params,httpOptions).pipe(
            map((res: Response) => res))
    }


    doPostLogIn(url: string, j: any) :  Observable<any> {
        var params = JSON.stringify(j);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        headers = headers.set('Authorization',this.getHeaderToken(true));
        
        return this.httpClient.post(url, params, {headers}).pipe(
            map(res =>res));
    }

    doPost(url: string, j: any): any {
        var params = JSON.stringify(j);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        headers = headers.set('Authorization',this.getHeaderToken(false));
       
        return this.httpClient.post(url, params, {headers}).pipe(
            map(res => res));
    }
 
    doPostNormal(url: string, j: any): Observable<any>{
        var params = JSON.stringify(j);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.ics._key + '');
        return this.http.post(url, params, { headers: headers }).pipe(
            map(res => {
                return res.json();
            })
        );
    }

    upload(url: string, files: File) {
        let fd = new FormData();
        fd.append("uploadedFile", files);
        var headers = new Headers();
        headers.append('Content-Over', this.ics._orgId);
        return this.http.post(url, fd, { headers: headers }).pipe(
            map(res => {
                return res.json();
            })
        );
    }

    download(u, j, t) {
        if (!u) return;
        let self = this;
        let xhr = new XMLHttpRequest();
        xhr.open('POST', u, true);
        xhr.setRequestHeader("Content-Over", this.ics._orgId);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.responseType = 'blob';
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var blob = new Blob([this.response], { type: 'application/' + (t == 'pdf' ? 'pdf' : 'vnd.ms-excel') });
                var u = URL.createObjectURL(blob);
                saveAs(blob, self._util.getTodayDate() + '.xls');
            }
        };
        xhr.send(JSON.stringify(j));
    }

    getHeaderToken(isAuth) {
        let auth;
       
        if (isAuth)
            auth = this.ics._ref_key+this._util.readCookie("rs_tkn");
        else
            auth = this._util.readCookie("wk_tkn");
        return auth;
    }

    getAuthToken(isAuth){
        let auth;
      
        if (isAuth)
            auth = this.ics._ref_key+this._util.readCookie("rs_tkn");
        else
            auth = this.ics._key+this._util.readCookie("wk_tkn");

            console.log("EHADER" + auth);
      return auth;
    }
}