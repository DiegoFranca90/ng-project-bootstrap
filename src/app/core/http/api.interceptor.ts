import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

/**
 * Class Intercept Http Requests and prepend predefined Url
 * @classdesc Intercept any Http Requests what do not start with any protocol (ex: http: and https:) or slash
 */
@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.match(/^(?:(?:\w+:\/\/)|\/)/) === null) {
      const apiReq = req.clone({url: `${environment.url.replace(/\/$/, '')}/${req.url}`});
      return next.handle(apiReq);
    }
    return next.handle(req);
  }
}
