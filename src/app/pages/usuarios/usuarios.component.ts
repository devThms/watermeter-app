import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../models/usuario.model';
import { Role } from '../../models/role.model';
import { UsuarioService, RoleService } from '../../services/service.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  roles: Role[] = [];
  totalRegistros = 0;
  registrosMostrados = 0;
  cargando = true;

  constructor(
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService,
    // tslint:disable-next-line: variable-name
    public _roleService: RoleService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._roleService.cargarRoles()
                        .subscribe( (resp: any) => {
                          this.roles = resp.data.data;
                        });
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios()
                        .subscribe( (resp: any) => {
                          this.totalRegistros = resp.data.total;
                          this.registrosMostrados = resp.data.per_page;
                          this.usuarios = resp.data.data;
                          this.cargando = false;
                        });

  }


  borrarUsuario( usuario: Usuario ) {

    if ( usuario.id === this._usuarioService.usuario.id ) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'El usuario no puede eliminarse a si mismo'
      });
      return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: '¿Está seguro que desea eliminar el usuario',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Asi es',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this._usuarioService.borrarUsuario( usuario )
                            .subscribe( borrado => {
                              console.log(borrado);
                              this.cargarUsuarios();
                            });

        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'El usuario ha sido eliminado',
          'success'
        );

      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Accion cancelada por el usuario',
          'error'
        );
      }
    });

  }

  actualizarUsuario( usuario: Usuario ) {

    this._usuarioService.actualizarUsuario( usuario )
                        .subscribe(resp => {
                          Swal.fire({
                            type: 'success',
                            title: 'Usuario Actualizado',
                            text: usuario.name
                          });
                          this.cargarUsuarios();
                        });
  }

}
