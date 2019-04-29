import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class XhrInterceptor  implements HttpInterceptor {
  /*
    check if there is a token in user's local storage, if yes, add it to request header,
    so that the user have access to secure ressources
  */
    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("id_token");
        if (token) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", token)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}
