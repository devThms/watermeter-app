import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

// Services API
import { Role } from '../../models/role.model';

import Swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

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

  cargarRoles() {

    const url = URL_SERVICES + '/roles';

    return this.http.get( url, this.httpOptions );
  }


  crearRole( role: Role) {

    const url = URL_SERVICES + '/roles';

    return this.http.post( url, role, this.httpOptions)
                    .pipe(map( (resp: any) => {

                          Swal.fire({
                            icon: 'success',
                            title: 'Role de Usuario Creado',
                            text: role.description
                          });

                          return resp;

                      }),
                        catchError( err => {
                          Swal.fire({
                            icon: 'error',
                            title: err.error.mensaje,
                            text: err.error.err.message
                          });

                          return throwError(err);
                        })
                      );

  }

  actualizarRole( role: Role ) {

    const url = URL_SERVICES + '/roles/' + role.id;

    return this.http.put( url, role, this.httpOptions )
                    .pipe(map( (resp: any) => {
                        return resp;
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

  borrarRole( role: Role ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/roles/' + role.id;

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
