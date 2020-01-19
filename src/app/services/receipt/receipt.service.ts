import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import Swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Meter } from '../../models/meter.model';
import { Receipt } from '../../models/receipt.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class ReceiptService {

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



  cargarRecibosLog( meter: Meter ) {
    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/cash-receipts/receipt-log/' + meter.id;

    return this.http.get( url, this.httpOptions );
  }

  cargarRecibosPago( meter: Meter ) {
    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/cash-receipts/pending-payment/' + meter.id;

    return this.http.get( url, this.httpOptions );
  }

  crearRecibo( receipt: Receipt ) {

    const url = URL_SERVICES + '/cash-receipts';

    return this.http.post( url, receipt, this.httpOptions)
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

  actualizarRecibo( receipt: Receipt ) {

    const url = URL_SERVICES + '/cash-receipts/' + receipt.id;

    return this.http.put( url, receipt, this.httpOptions )
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

  borrarRecibo( receipt: Receipt ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/cash-receipts/' + receipt.id;

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


}
