import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { SpinnerService } from "../services/spinner.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(
        private spinnerService: SpinnerService
    ) { }

    intercept(
        requestHeader: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.spinnerService.startSpinner();
        return next.handle(requestHeader).pipe(
            tap((event: any) => {
                if (event instanceof HttpResponse) {
                    this.spinnerService.stopSpinner();
                }
            }),
            catchError((err: any) => {
                this.spinnerService.stopSpinner();
                /* #region Handler Error */
                return throwError(err);
            })
        );
    }
}