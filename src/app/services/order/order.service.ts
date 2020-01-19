import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import Swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Order } from '../../models/order.model';
import { Meter } from '../../models/meter.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

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

  cargarOrdenesLog( meter: Meter ) {

    const  url = URL_SERVICES + '/orders/order-log/' + meter.id;

    return this.http.get( url, this.httpOptions );
  }

  cargarOrdenesPago( meter: Meter ) {


    const  url = URL_SERVICES + '/orders/pending-payment/' + meter.id;


    return this.http.get( url, this.httpOptions );
  }

  crearOrden( order: Order ) {

    const url = URL_SERVICES + '/orders';

    return this.http.post( url, order, this.httpOptions)
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

  actualizarOrden( order: Order ) {

    const url = URL_SERVICES + '/orders/' + order.id;

    return this.http.put( url, order, this.httpOptions )
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

  borrarOrden( order: Order ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/orders/' + order.id;

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
