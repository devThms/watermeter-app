import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { URL_SERVICES } from '../../config/config';
import Swal from 'sweetalert2';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Zone } from '../../models/zone.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class ZoneService {

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

  cargarZonas() {
    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/zones';

    return this.http.get( url, this.httpOptions );
  }

  crearZona( zone: Zone) {

    const url = URL_SERVICES + '/zones';

    return this.http.post( url, zone, this.httpOptions)
                    .pipe(map( (resp: any) => {
                          return resp;
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

  actualizarZona( zone: Zone ) {

    const url = URL_SERVICES + '/zones/' + zone.id;

    return this.http.put( url, zone, this.httpOptions )
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

  borrarZona( zone: Zone ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/zones/' + zone.id;

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
