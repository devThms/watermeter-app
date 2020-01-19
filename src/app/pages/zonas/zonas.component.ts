import { Component, OnInit } from '@angular/core';

import { ZoneService } from '../../services/service.index';
import { Zone } from '../../models/zone.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styles: []
})
export class ZonasComponent implements OnInit {

  zones: Zone[] = [];
  zone: Zone = new Zone('', 0);
  totalRegistros = 0;
  registrosMostrados = 0;
  cargando = true;
  modalCreate = 'ocultar';
  modalUpdate = 'ocultar';

  constructor(
    // tslint:disable-next-line: variable-name
    public _zoneService: ZoneService
  ) { }

  ngOnInit() {
    this.cargarZonas();
  }

  hideModalCreate() {
    this.modalCreate = 'ocultar';
  }

  showModalCreate() {
    this.modalCreate = '';
  }

  hideModalUpdate() {
    this.modalUpdate = 'ocultar';
    this.zone.description = null;
    this.zone.dateMax = null;
    this.cargarZonas();
  }

  showModalUpdate( zone: Zone ) {
    this.zone = zone;
    this.modalUpdate = '';
  }

  cargarZonas() {

    this.cargando = true;

    this._zoneService.cargarZonas()
                        .subscribe( (resp: any) => {
                          this.totalRegistros = resp.data.total;
                          this.registrosMostrados = resp.data.per_page;
                          this.zones = resp.data.data;
                          this.cargando = false;
                        });

  }

  paginate() {
    // TODO: realizar paginación
  }

  crearZona( zone: Zone ) {

    this.zone = zone;

    this._zoneService.crearZona( this.zone )
                      .subscribe( (resp: any) => {
                          Swal.fire({
                            icon: 'success',
                            title: 'Zona Creada',
                            text: zone.description
                          });
                          this.cargarZonas();
                          this.hideModalCreate();
                      });
  }

  actualizarZona( zone: Zone ) {

    this.zone = zone;

    this._zoneService.actualizarZona( this.zone )
                      .subscribe( (resp: any) => {
                        Swal.fire({
                          type: 'success',
                          title: 'Zona Actualizada',
                          text: zone.description
                        });
                        this.cargarZonas();
                        this.hideModalUpdate();
                      });
  }

  borrarZona( zone: Zone ) {

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

        this._zoneService.borrarZona( zone )
                            .subscribe( borrado => {
                              console.log(borrado);
                              this.cargarZonas();
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
