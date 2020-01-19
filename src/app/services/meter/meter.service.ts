import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Services API
import { URL_SERVICES } from '../../config/config';
import { Zone } from '../../models/zone.model';
import { Meter } from '../../models/meter.model';

import Swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})

export class MeterService {

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

  cargarMedidores( zone: Zone ) {

    const  url = URL_SERVICES + '/meters/zone/' + zone.id;

    return this.http.get( url, this.httpOptions );
  }

  crearMedidor( meter: Meter ) {

    const url = URL_SERVICES + '/meters';

    return this.http.post( url, meter, this.httpOptions)
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

  actualizarMedidor( meter: Meter ) {

    const url = URL_SERVICES + '/meters/' + meter.id;

    return this.http.put( url, meter, this.httpOptions )
                    .pipe(map( (resp: any) => {
                        return true;
                    }),
                    catchError( err => {

                      Swal.fire({
                        type: 'error',
                        title: 'Error al crear',
                        text: err.error.data.message
                      });

                      return throwError(err);

                    }));

  }

  borrarMedidor( meter: Meter ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/meters/' + meter.id;

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
