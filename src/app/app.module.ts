import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './@core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './@core/interceptor/interceptor';
import { SpinnerLoadingComponent } from './@core/components/spinner-loading/spinner-loading.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerLoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CoreModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true // can have multiple interceptor
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
