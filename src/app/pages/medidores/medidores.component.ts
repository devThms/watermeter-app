import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { MeterService } from '../../services/service.index';
import { Meter } from '../../models/meter.model';
import { ZoneService } from '../../services/zone/zone.service';
import { Zone } from '../../models/zone.model';
import { CustomerService } from '../../services/customer/customer.service';
import { Customer } from '../../models/customer.model';
import { Paginate } from '../../models/paginate.model';


@Component({
  selector: 'app-medidores',
  templateUrl: './medidores.component.html',
  styles: []
})

export class MedidoresComponent implements OnInit {

  meters: Meter[] = [];
  meter: Meter = new Meter(0, '', '', 0);
  zones: Zone[] = [];
  zone: Zone = new Zone('', 0);
  customers: Customer[] = [];
  customer: Customer = new Customer('', '', '', '', 0);

  pages: Paginate = new Paginate(false, false, '', '');


  totalRegistros = 0;
  registrosMostrados = 0;
  cargando = true;
  modalCreate = 'ocultar';
  modalUpdate = 'ocultar';

  constructor(
    // tslint:disable-next-line: variable-name
    public _meterService: MeterService,
    // tslint:disable-next-line: variable-name
    public _zoneService: ZoneService,
    // tslint:disable-next-line: variable-name
    public _customerService: CustomerService
  ) { }

  ngOnInit() {
    this.cargarZonas();
    this.cargarClientes();
  }

  hideModalCreate() {
    this.modalCreate = 'ocultar';
  }

  showModalCreate() {
    this.modalCreate = '';
  }

  hideModalUpdate() {
    this.modalUpdate = 'ocultar';
    this.meter.customer_id = null;
    this.meter.serialNumber = null;
    this.meter.address = null;
    this.cargarMedidores(this.zone);
  }

  showModalUpdate( meter: Meter ) {
    this.meter = meter;
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

  cargarClientes() {

    this.cargando = true;

    this._customerService.cargarClientes()
                        .subscribe( (resp: any) => {
                          this.totalRegistros = resp.data.total;
                          this.registrosMostrados = resp.data.per_page;
                          this.customers = resp.data.data;
                          this.cargando = false;
                        });

  }

  cargarMedidores( zone: Zone ) {

    this.zone = zone;

    this.cargando = true;

    this._meterService.cargarMedidores( this.zone )
                        .subscribe( (resp: any) => {
                          this.totalRegistros = resp.data.total;
                          this.registrosMostrados = resp.data.per_page;
                          this.meters = resp.data.data;
                          this.cargando = false;
                        });

  }


  crearMedidor( meter: Meter ) {

    this.meter = meter;
    this.meter.zone_id = this.zone.id;

    this._meterService.crearMedidor( this.meter )
                      .subscribe( (resp: any) => {
                          Swal.fire({
                            icon: 'success',
                            title: 'Medidor Creado',
                            text: meter.serialNumber
                          });
                          this.cargarMedidores( this.zone );
                          this.hideModalCreate();
                      });
  }

  actualizarMedidor( meter: Meter ) {

    this.meter = meter;

    this._meterService.actualizarMedidor( this.meter )
                      .subscribe( (resp: any) => {
                        Swal.fire({
                          type: 'success',
                          title: 'Medidor Actualizado',
                          text: meter.serialNumber
                        });
                        this.cargarMedidores( this.zone );
                        this.hideModalUpdate();
                      });
  }

  borrarMedidor( meter: Meter ) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: '¿Está seguro que desea eliminar el medidor',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Asi es',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this._meterService.borrarMedidor( meter )
                            .subscribe( borrado => {
                              console.log(borrado);
                              this.cargarMedidores( this.zone );
                            });

        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'El Medidor ha sido eliminado',
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
