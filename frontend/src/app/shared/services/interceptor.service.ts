import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {urlAPI} from '../constants/env';
import {Router} from '@angular/router';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor( private router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!(req.url === `${urlAPI}/authentication/register` || req.url === `${urlAPI}/authentication/api-token-auth`)) {
      if (!localStorage.getItem('userToken')) {
        this.router.navigate(['login']);
      }
    }
    return next.handle(req);
  }
}
