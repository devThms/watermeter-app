import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Zone } from '../../models/zone.model';
import { Meter } from '../../models/meter.model';
import { Order } from '../../models/order.model';

import { OrderService } from '../../services/order/order.service';
import { MeterService } from '../../services/meter/meter.service';
import { ZoneService } from '../../services/zone/zone.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Paginate } from '../../models/paginate.model';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styles: []
})

export class OrdenesComponent implements OnInit {

  meters: Meter[] = [];
  meter: Meter = new Meter(null, null, null, null, null, null);
  zones: Zone[] = [];
  zone: Zone = new Zone('', 0);
  orders: Order[] = [];
  order: Order = new Order(null, null, null, null, null, null, null);

  pages: Paginate = new Paginate(false, false, '', '');

  totalRegistros = 0;
  registrosMostrados = 0;
  cargando = true;
  modalCreate = 'ocultar';
  modalUpdate = 'ocultar';
  modalOrderLog = 'ocultar';
  modalOrderPago = 'ocultar';

  constructor(
    // tslint:disable-next-line: variable-name
    public _orderService: OrderService,
    // tslint:disable-next-line: variable-name
    public _meterService: MeterService,
    // tslint:disable-next-line: variable-name
    public _zoneService: ZoneService,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarZonas();
  }

  showModalCreate( meter: Meter ) {
    this.meter = meter;
    this.modalCreate = '';
    console.log(this.order);
  }

  hideModalCreate() {
    this.order.finalMeasure = 0;
    this.modalCreate = 'ocultar';
    console.log(this.order);
  }

  showModalOrderLog( meter: Meter ) {
    this.meter = meter;
    this.cargarOrdenesLog(this.meter);
    this.modalOrderLog = '';
  }

  hideModalOrderLog() {
    this.modalOrderLog = 'ocultar';
  }

  showModalOrderPago( meter: Meter ) {
    this.meter = meter;
    this.cargarOrdenesPago(this.meter);
    this.modalOrderPago = '';
  }

  hideModalOrderPago() {
    this.modalOrderPago = 'ocultar';
  }

  hideModalUpdate() {
    this.modalUpdate = 'ocultar';
    this.order.finalMeasure = 0;
    this.showModalOrderPago(this.meter);
    console.log(this.order);
  }

  showModalUpdate( order: Order ) {
    this.order = order;
    this.modalOrderPago = 'ocultar';
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

  cargarMedidores( zone: Zone) {

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

  cargarOrdenesLog( meter: Meter ) {

    this.meter = meter;
    this.cargando = true;

    this._orderService.cargarOrdenesLog( this.meter )
                      .subscribe( (resp: any) => {
                        this.totalRegistros = resp.data.total;
                        this.registrosMostrados = resp.data.per_page;
                        this.orders = resp.data.data;
                        this.cargando = false;
                      });
  }

  cargarOrdenesPago( meter: Meter ) {

    this.meter = meter;
    this.cargando = true;

    this._orderService.cargarOrdenesPago( this.meter )
                      .subscribe( (resp: any) => {
                        this.totalRegistros = resp.data.total;
                        this.registrosMostrados = resp.data.per_page;
                        this.orders = resp.data.data;
                        this.cargando = false;
                      });
  }


  crearOrden( order: Order ) {

    this.order = order;
    this.order.meter_id = this.meter.id;
    this.order.user_id = this._usuarioService.usuario.id;

    console.log(this.order);

    this._orderService.crearOrden( this.order )
                      .subscribe( (resp: any) => {

                        if (resp.ok) {
                          Swal.fire({
                            icon: 'success',
                            title: 'Orden Creada',
                            text: 'Orden No. 0000' + resp.id
                          });
                        } else {
                          Swal.fire({
                            icon: 'error',
                            title: 'Orden no procesada',
                            text: resp.message
                          });
                        }
                        this.cargarMedidores( this.zone );
                        this.hideModalCreate();
                      });
  }

  actualizarOrden( order: Order ) {

    this.order = order;

    this._orderService.actualizarOrden( this.order )
                      .subscribe( (resp: any) => {

                        if (resp.ok) {
                          Swal.fire({
                            type: 'success',
                            title: 'Orden Actualizada',
                            text: 'Orden No. 0000' + order.id
                          });
                        } else {
                          Swal.fire({
                            type: 'success',
                            title: 'Orden no Procesada',
                            text: resp.message
                          });
                        }

                        this.cargarMedidores( this.zone );
                        this.hideModalUpdate();
                        this.hideModalOrderPago();
                      });
  }

  borrarOrden( order: Order ) {

    this.modalOrderPago = 'ocultar';

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: '¿Está seguro que desea eliminar la orden',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Asi es',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this._orderService.borrarOrden( order )
                            .subscribe( borrado => {
                              console.log(borrado);
                              this.cargarMedidores( this.zone );
                            });

        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'La orden ha sido eliminada',
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
