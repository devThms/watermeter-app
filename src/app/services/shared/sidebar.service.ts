import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuAdmin: any = [
    {
      titulo: 'Datos Maestros',
      icono: 'mdi mdi-database',
      submenu: [
        { titulo: 'Roles', icono: 'mdi mdi-account-card-details', url: '/roles-usuario' },
        { titulo: 'Usuarios', icono: 'mdi mdi-account-card-details', url: '/usuarios' },
        { titulo: 'Clientes', icono: 'mdi mdi-clipboard', url: '/clientes' },
        { titulo: 'Zonas', icono: 'mdi mdi-compass-outline', url: '/zonas' },
        { titulo: 'Medidores', icono: 'mdi mdi-speedometer', url: '/medidores' },
      ]
    },
    {
      titulo: 'Operaciones',
      icono: 'mdi mdi-monitor',
      submenu: [
        { titulo: 'Registro Orden', icono: 'mdi mdi-content-paste', url: '/orden-registro' }
      ]
    },
    {
      titulo: 'Contabilidad',
      icono: 'mdi mdi-book-open-page-variant',
      submenu: [
        { titulo: 'Facturación', icono: 'mdi mdi-file-document', url: '/facturacion' }
      ]
    }
  ];

  menuOperator: any = [
    {
      titulo: 'Operaciones',
      icono: 'mdi mdi-monitor',
      submenu: [
        { titulo: 'Registro Orden', icono: 'mdi mdi-content-paste', url: '/orden-registro' }
      ]
    }
  ];

  menuConta: any = [
    {
      titulo: 'Contabilidad',
      icono: 'mdi mdi-book-open-page-variant',
      submenu: [
        { titulo: 'Facturación', icono: 'mdi mdi-file-document', url: '/facturacion' }
      ]
    }
  ];

  constructor( ) { }
}
