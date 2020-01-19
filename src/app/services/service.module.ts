import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  AdminGuard,
  SupervisorGuard,
  ContabilidadGuard,
  CustomerService,
  MeterService,
  RoleService,
  ZoneService,
  OrderService,
  ReceiptService,
  InvoiceService
 } from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    SupervisorGuard,
    ContabilidadGuard,
    CustomerService,
    MeterService,
    RoleService,
    ZoneService,
    OrderService,
    ReceiptService,
    InvoiceService
  ]
})
export class ServiceModule { }
