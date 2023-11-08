/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
    providedIn: 'root',
})
export class RequestInterceptor implements HttpInterceptor {

    constructor(private spinner: NgxSpinnerService) {

    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        this.spinner.show();

        request = request.clone({
            headers: request.headers.set('authorId', '500')
        });

        return next.handle(request).pipe(tap(async (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.spinner.hide();
            }
        },
            (err: any) => {
                this.spinner.hide();
            }));
    }

}
