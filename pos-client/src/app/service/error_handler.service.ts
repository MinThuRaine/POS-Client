import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Internal_connect_Service } from '../service/internal_connect.service';
@Injectable()
export class Error_Handler_Service implements ErrorHandler {

    constructor(private incs : Internal_connect_Service){}
    handleError(error: any) {
      if (error instanceof HttpErrorResponse) {			  
          
          console.error('Backend returned status code: ', error.status);
          console.error('Response body:', error.message);         
          if(error.status==400){
              this.incs.sendReq({type:"expire",title:"Session Expire",msg:"Please Log In Again."});
          }else if(error.status==401){
            this.incs.sendReq({type:"sign",title:"Unauthorize Access",msg:"Please Log In Again."});
          }	  
      } else {
          //A client-side or network error occurred.	          
          console.error('An error occurred:', error.message);          
      }     
    }
} 