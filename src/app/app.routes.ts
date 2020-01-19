import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { RegisterComponent } from './login/register.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent, data: { titulo: 'Login Usuario' } },
    { path: 'register', component: RegisterComponent, data: { titulo: 'Registro Usuario' } },
    { path: '**', component: NotFoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
