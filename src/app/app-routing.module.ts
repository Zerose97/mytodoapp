import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalAuthGuard } from './@core/guards/internal-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/authen/authen.module').then((m) => m.AuthenModule)
  },
  {
    path: 'layout',
    canActivate: [InternalAuthGuard],
    loadChildren: () =>
      import('./modules/layout/layout.module').then((m) => m.LayoutModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
