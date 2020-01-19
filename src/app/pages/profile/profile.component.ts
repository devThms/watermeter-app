import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  constructor(
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {
  }

  actualizar( usuario: Usuario ) {

    this.usuario.name = usuario.name;
    this.usuario.email = usuario.email;
    this.usuario.password = usuario.password;

    this._usuarioService.actualizarUsuario( this.usuario )
                        .subscribe( resp => {

                          console.log(resp);

                          Swal.fire({
                            type: 'success',
                            title: 'Usuario Actualizado',
                            text: usuario.name
                          });

                        });

  }


}
