import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

import { URL_SERVICES } from '../../config/config';
import { Customer } from '../../models/customer.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

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

  cargarClientes( page: string = null ) {

    let url = '';

    if (page === null) {
      url = URL_SERVICES + '/customers';
    } else {
      url = URL_SERVICES + '/customers?' + page;
    }

    return this.http.get( url, this.httpOptions );
  }

  crearCliente( customer: Customer) {

    const url = URL_SERVICES + '/customers';

    return this.http.post( url, customer, this.httpOptions)
                    .pipe(map( (resp: any) => {
                          return true;
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

  actualizarCliente( customer: Customer ) {

    const url = URL_SERVICES + '/customers/' + customer.id;

    return this.http.put( url, customer, this.httpOptions )
                    .pipe(map( (resp: any) => {
                        return true;
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

  borrarCliente( customer: Customer ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/customers/' + customer.id;

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
