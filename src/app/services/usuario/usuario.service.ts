import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
      this.cargarStorage();
    }

  estaLogueado() {
    return ( this.token.length > 1 ) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.token = JSON.parse( localStorage.getItem('token') );
    } else {
      this.usuario = null;
      this.token = '';
    }
  }

  guardarStorage( id: string, usuario: Usuario, token: string ) {
    localStorage.setItem('id', id);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('token', JSON.stringify(token));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    // const url = URL_SERVICES + '/users/login';
    const url = URL_SERVICES + '/v1/auth/login';

    return this.http.post( url, usuario )
                    .pipe(map((resp: any) => {

                      if (resp.data.ok) {

                          // Guardar info de Login en LocalStorage
                          this.guardarStorage(resp.data.user.id, resp.data.user, resp.data.access_token);
                          console.log(resp.data);
                          return resp.data;

                      }
                    }),
                      catchError( err => {
                        Swal.fire({
                          icon: 'error',
                          title: 'Error en login',
                          text: 'Credenciales incorrectas'
                        });

                        return throwError(err);
                      })
                    );

  }

  crearUsuario( usuario: Usuario) {

    const url = URL_SERVICES + '/users';

    return this.http.post( url, usuario )
                    .pipe(map( (resp: any) => {

                          Swal.fire({
                            icon: 'success',
                            title: 'Usuario Creado',
                            text: usuario.email
                          });

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

  actualizarUsuario( usuario: Usuario ) {

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'bearer ' + this.token
      })
    };


    const url = URL_SERVICES + '/users/' + usuario.id;

    return this.http.put( url, usuario, httpOptions )
                    .pipe(map( (resp: any) => {

                        if ( usuario.id === this.usuario.id ) {
                          // tslint:disable-next-line:prefer-const
                          let usuarioDB: Usuario = resp.data;
                          this.usuario = usuarioDB;
                          this.guardarStorage(resp.data.id, usuarioDB, this.token);
                        }
                        return true;
                    }),
                    catchError( err => {

                      Swal.fire({
                        type: 'error',
                        title: 'Error al actualizar',
                        text: err.error.data.message
                      });

                      console.log(err);
                      return throwError(err);

                    }));

  }

  cargarUsuarios() {
    // tslint:disable-next-line:prefer-const

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'bearer ' + this.token
      })
    };

    let url = URL_SERVICES + '/users';

    return this.http.get( url, httpOptions );
  }

  borrarUsuario( usuario: Usuario ) {

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'bearer ' + this.token
      })
    };

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/users/' + usuario.id;

    return this.http.delete( url, httpOptions )
                  .pipe(map((resp: any) => {
                    return resp;
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
