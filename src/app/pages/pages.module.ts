import { NgModule } from '@angular/core';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Modules
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
import { RecibosComponent } from './recibos/recibos.component';
import { FacturasComponent } from './facturas/facturas.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProfileComponent,
        UsuariosComponent,
        RolesComponent,
        ClientesComponent,
        ZonasComponent,
        MedidoresComponent,
        OrdenesComponent,
        RecibosComponent,
        FacturasComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ]
})

export class PageModule { }
