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
      // Clona la solicitud para agregar el nuevo header.
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken)
      });
      // Pasar la solicitud clonada en lugar de la original a la siguiente cadena de llamada.
      return next.handle(authReq);
    }
    // Si no hay token, envía la solicitud original.
    return next.handle(req);
  }
}
