import { Routes, RouterModule, CanActivate } from '@angular/router';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RolesComponent } from './roles/roles.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ZonasComponent } from './zonas/zonas.component';
import { MedidoresComponent } from './medidores/medidores.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { FacturasComponent } from './facturas/facturas.component';

import {
            LoginGuardGuard,
            AdminGuard,
            SupervisorGuard,
            ContabilidadGuard
        } from '../services/service.index';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' } },

            // Datos Maestros
            { path: 'roles-usuario', component: RolesComponent,
                canActivate: [AdminGuard], data: { titulo: 'Roles de Usuarios' } },
            { path: 'usuarios', component: UsuariosComponent,
                canActivate: [AdminGuard], data: { titulo: 'Mantenimiento de Usuarios' } },
            { path: 'clientes', component: ClientesComponent,
                canActivate: [SupervisorGuard], data: { titulo: 'Mantenimiento de Clientes' } },
            { path: 'zonas', component: ZonasComponent,
                canActivate: [SupervisorGuard], data: { titulo: 'Mantenimiento de Zonas' } },
            { path: 'medidores', component: MedidoresComponent,
                canActivate: [SupervisorGuard], data: { titulo: 'Mantenimiento de Medidores' } },

            // Operaciones
            { path: 'orden-registro', component: OrdenesComponent, data: { titulo: 'Registro de Ordenes' } },

            // Contabilidad
            { path: 'facturacion', component: FacturasComponent,
                canActivate: [ContabilidadGuard], data: { titulo: 'Facturación' } },

            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
