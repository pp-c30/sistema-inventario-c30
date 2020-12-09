import { Injectable } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor() { }


  intercept(req,next){

    const tokenizeRequest = req.clone({

      setHeaders:{

        Authorization:String(localStorage.getItem('token'))
      }
    });

    return next.handle(tokenizeRequest);
  }
}
