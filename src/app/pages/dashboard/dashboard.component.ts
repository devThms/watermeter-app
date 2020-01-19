import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../models/invoice.model';
import { InvoiceService } from '../../services/invoice/invoice.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  invoices: Invoice[] = [];
  users: Usuario[] = [];

  usuario: number;
  from: Date;
  to: Date;

  constructor(
    // tslint:disable-next-line: variable-name
    public _invoiceService: InvoiceService,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }


  cargarUsuarios() {

    this._usuarioService.cargarUsuarios()
                        .subscribe( (resp: any) => {
                          this.users = resp.data.data;
                        });

  }

  cargarReporte( usuario: number, from: Date, to: Date ) {

    this.usuario = usuario;
    this.from = from;
    this.to = to;

    this._invoiceService.cargarReporte( this.usuario, this.from, this.to)
                        .subscribe( (resp: any) => {
                          this.invoices = resp.data;
                        });

  }

}
