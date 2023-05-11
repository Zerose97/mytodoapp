import { HttpClientModule } from '@angular/common/http';
import { NgModule, Injector, Optional, SkipSelf } from '@angular/core';
import { InternalAuthGuard } from './guards/internal-auth.guard';
import { AuthenService } from './services/authen.service';
import { ToDoService } from './services/todo.service';
import { UserService } from './services/user.service';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './states/todo/todo.reducer';
import { userReducer } from './states/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './states/todo/todo.effect';
import { UserEffects } from './states/user/user.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { SpinnerService } from './services/spinner.service';
import { SpinnerLoadingComponent } from './components/spinner-loading/spinner-loading.component';
export let CoreInjector: Injector;

const guards = [
    InternalAuthGuard
];

const services = [
    AuthenService,
    ToDoService,
    UserService,
    SpinnerService
];

const states = [
    StoreModule.forRoot({
        todos: todoReducer,
        users: userReducer
    })
]

const effects = [
    EffectsModule.forRoot([
        TodoEffects,
        UserEffects
    ]),
]

@NgModule({
    imports: [
        HttpClientModule,
        StoreModule.forRoot({ todos: todoReducer, users: userReducer }),
        EffectsModule.forRoot([TodoEffects, UserEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
    ],
    providers: [
        ...guards,
        ...services
    ]
})

export class CoreModule {}
