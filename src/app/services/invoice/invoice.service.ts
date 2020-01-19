import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Meter } from '../../models/meter.model';
import { URL_SERVICES } from '../../config/config';
import { Invoice } from '../../models/invoice.model';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})

export class InvoiceService {

  constructor(
    public http: HttpClient,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'bearer ' + this._usuarioService.token
    })
  };


  cargarFacturasLog( meter: Meter ) {
    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/invoices/invoice-log/' + meter.id;

    return this.http.get( url, this.httpOptions );
  }

  cargarFacturasPago( meter: Meter ) {
    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/invoices/pending-payment/' + meter.id;

    return this.http.get( url, this.httpOptions );
  }

  cargarReporte( usuario: number, from: Date, to: Date ) {


    // let url = '';

    // if (usuario === null) {
    //   let url = URL_SERVICES + '/invoices/report/' + this._usuarioService.usuario.id + '/' + from + '/' + to;
    // } else {
    //   let url = URL_SERVICES + '/invoices/report/' + usuario + '/' + from + '/' + to;
    // }

    const url = URL_SERVICES + '/invoices/report/' + usuario + '/' + from + '/' + to;


    return this.http.get( url );

  }

  crearFactura( invoice: Invoice ) {

    const url = URL_SERVICES + '/invoices';

    return this.http.post( url, invoice, this.httpOptions)
                    .pipe(map( (resp: any) => {
                          return resp.data;
                      }),
                        catchError( err => {
                          Swal.fire({
                            icon: 'error',
                            title: 'Error al crear',
                            text: err.error.data.message
                          });

                          return throwError(err);
                        })
                      );

  }

  actualizarFactura( invoice: Invoice ) {

    const url = URL_SERVICES + '/invoices/' + invoice.id;

    return this.http.put( url, invoice, this.httpOptions )
                    .pipe(map( (resp: any) => {
                        return resp.data;
                    }),
                    catchError( err => {

                      Swal.fire({
                        type: 'error',
                        title: 'Error al actualizar',
                        text: err.error.data.message
                      });

                      return throwError(err);

                    }));

  }

  borrarFactura( invoice: Invoice ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/invoices/' + invoice.id;

    return this.http.delete( url, this.httpOptions )
                  .pipe(map((resp: any) => {
                    return true;
                  }),
                  catchError( err => {

                    Swal.fire({
                      type: 'error',
                      title: 'Error al borrar',
                      text: err.error.data.message
                    });

                    return throwError(err);

                  }));

  }

  payment( invoice: Invoice ) {

    // tslint:disable-next-line: prefer-const
    let url = URL_SERVICES + '/invoices/payment/' + invoice.id;

    return this.http.post( url, invoice, this.httpOptions )
                    .pipe(map((resp: any) => {
                      return resp.factura;
                    }),
                    catchError( err => {

                      Swal.fire({
                        type: 'error',
                        title: 'Error al procesar',
                        text: err.error.data.message
                      });

                      return throwError(err);

                    }));
  }

  cancelInvoice( invoice: Invoice ) {

    // tslint:disable-next-line: prefer-const
    let url = URL_SERVICES + '/invoices/cancel/' + invoice.id;

    return this.http.post( url, invoice, this.httpOptions )
                    .pipe(map((resp: any) => {
                      return resp.factura;
                    }),
                    catchError( err => {

                      Swal.fire({
                        type: 'error',
                        title: 'Error al procesar',
                        text: err.error.data.message
                      });

                      return throwError(err);

                    }));

  }

}
