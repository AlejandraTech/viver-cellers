import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('access_token');
    if (authToken) {
      // Clone the request to add the new header
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken)
      });
      // Pass the cloned request instead of the original one to the next chain of calls
      return next.handle(authReq);
    }
    // If there's no token, send the original request
    return next.handle(req);
  }
}
