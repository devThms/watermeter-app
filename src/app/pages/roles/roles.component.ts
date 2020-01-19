import { Component, OnInit } from '@angular/core';

import { Role } from '../../models/role.model';
import { RoleService } from '../../services/service.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styles: []
})
export class RolesComponent implements OnInit {

  roles: Role[] = [];
  role: Role = new Role('');
  totalRegistros = 0;
  registrosMostrados = 0;
  cargando = true;
  modalCreate = 'ocultar';
  modalUpdate = 'ocultar';

  constructor(
    // tslint:disable-next-line: variable-name
    public _roleService: RoleService
  ) { }

  ngOnInit() {
    this.cargarRoles();
  }

  hideModalCreate() {
    this.modalCreate = 'ocultar';
  }

  showModalCreate() {
    this.modalCreate = '';
  }

  hideModalUpdate() {
    this.modalUpdate = 'ocultar';
    this.role.description = null;
    this.cargarRoles();
  }

  showModalUpdate( role: Role ) {
    this.role = role;
    this.modalUpdate = '';
  }

  cargarRoles() {

    this.cargando = true;

    this._roleService.cargarRoles()
                        .subscribe( (resp: any) => {
                          this.totalRegistros = resp.data.total;
                          this.registrosMostrados = resp.data.per_page;
                          this.roles = resp.data.data;
                          this.cargando = false;
                        });

  }

  paginate() {
    // TODO: realizar paginación
  }

  crearRole( role: Role ) {

    this.role = role;

    this._roleService.crearRole( this.role )
                      .subscribe( (resp: any) => {
                          Swal.fire({
                            type: 'success',
                            title: 'Role de Usuario Creado',
                            text: role.description
                          });
                          this.cargarRoles();
                          this.hideModalCreate();
                      });
  }

  actualizarRole( role: Role ) {

    this.role = role;

    this._roleService.actualizarRole( this.role )
                      .subscribe( (resp: any) => {
                        Swal.fire({
                          type: 'success',
                          title: 'Role de Usuario Actualizado',
                          text: role.description
                        });
                        this.cargarRoles();
                        this.hideModalUpdate();
                      });
  }

  borrarRole( role: Role ) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: '¿Está seguro que desea eliminar el rol de usuario',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Asi es',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this._roleService.borrarRole( role )
                            .subscribe( borrado => {
                              console.log(borrado);
                              this.cargarRoles();
                            });

        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'El Rol de Usuario ha sido eliminado',
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

}
