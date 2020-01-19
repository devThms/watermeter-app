import { Component, OnInit } from '@angular/core';

import { Meter } from '../../models/meter.model';
import { Zone } from '../../models/zone.model';
import { Receipt } from '../../models/receipt.model';
import { Invoice } from '../../models/invoice.model';
import { Order } from '../../models/order.model';

import { OrderService } from '../../services/order/order.service';
import { MeterService } from '../../services/meter/meter.service';
import { ZoneService } from '../../services/zone/zone.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ReceiptService } from '../../services/receipt/receipt.service';
import { InvoiceService } from '../../services/invoice/invoice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styles: []
})
export class FacturasComponent implements OnInit {

  meters: Meter[] = [];
  meter: Meter = new Meter(null, null, null, null, null, null);
  zones: Zone[] = [];
  zone: Zone = new Zone('', 0);
  orders: Order[] = [];
  receipts: Receipt[] = [];
  receipt: Receipt = new Receipt(null, null, '', 0);
  invoices: Invoice[] = [];
  invoice: Invoice = new Invoice(null, null, '', 0);

  totalRegistros = 0;
  registrosMostrados = 0;
  cargando = true;
  activo = false;
  modalOrderLog = 'ocultar';
  modalOrderPago = 'ocultar';
  modalReceiptLog = 'ocultar';
  modalReceiptPago = 'ocultar';
  modalFacturaLog = 'ocultar';
  modalFacturaPago = 'ocultar';

  constructor(
    // tslint:disable-next-line: variable-name
    public _orderService: OrderService,
    // tslint:disable-next-line: variable-name
    public _meterService: MeterService,
    // tslint:disable-next-line: variable-name
    public _zoneService: ZoneService,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService,
    // tslint:disable-next-line: variable-name
    public _receiptService: ReceiptService,
    // tslint:disable-next-line: variable-name
    public _invoiceService: InvoiceService
  ) { }

  ngOnInit() {
    this.cargarZonas();
    if (localStorage.getItem('dia')) {
      this.activo = JSON.parse( localStorage.getItem('dia') );
    } else {
      this.activo = false;
    }
  }

  activarDia() {
    this.activo = true;
    localStorage.setItem('dia', 'true');
  }

  cerrarDia() {
    this.activo = false;
    localStorage.removeItem('dia');
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

  showModalReceiptLog( meter: Meter ) {
    this.meter = meter;
    this.cargarRecibosLog(this.meter);
    this.modalReceiptLog = '';
  }

  hideModalReceiptLog() {
    this.modalReceiptLog = 'ocultar';
  }

  showModalReceiptPago( meter: Meter ) {
    this.meter = meter;
    this.cargarRecibosPago(this.meter);
    this.modalReceiptPago = '';
  }

  hideModalReceiptPago() {
    this.modalReceiptPago = 'ocultar';
  }

  showModalInvoiceLog( meter: Meter ) {
    this.meter = meter;
    this.cargarFacturasLog(this.meter);
    this.modalFacturaLog = '';
  }

  hideModalInvoiceLog() {
    this.modalFacturaLog = 'ocultar';
  }

  showModalInvoicePago( meter: Meter ) {
    this.meter = meter;
    this.cargarFacturasPago(this.meter);
    this.modalFacturaPago = '';
  }

  hideModalInvoicePago() {
    this.modalFacturaPago = 'ocultar';
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

  cargarRecibosLog( meter: Meter ) {

    this.meter = meter;
    this.cargando = true;

    this._receiptService.cargarRecibosLog( this.meter )
                      .subscribe( (resp: any) => {
                        this.totalRegistros = resp.data.total;
                        this.registrosMostrados = resp.data.per_page;
                        this.receipts = resp.data.data;
                        this.cargando = false;
                      });
  }

  cargarRecibosPago( meter: Meter ) {

    this.meter = meter;
    this.cargando = true;

    this._receiptService.cargarRecibosPago( this.meter )
                      .subscribe( (resp: any) => {
                        this.totalRegistros = resp.data.total;
                        this.registrosMostrados = resp.data.per_page;
                        this.receipts = resp.data.data;
                        this.cargando = false;
                      });
  }

  cargarFacturasLog( meter: Meter ) {

    this.meter = meter;
    this.cargando = true;

    this._invoiceService.cargarFacturasLog( this.meter )
                      .subscribe( (resp: any) => {
                        this.totalRegistros = resp.data.total;
                        this.registrosMostrados = resp.data.per_page;
                        this.invoices = resp.data.data;
                        this.cargando = false;
                      });
  }

  cargarFacturasPago( meter: Meter ) {

    this.meter = meter;
    this.cargando = true;

    this._invoiceService.cargarFacturasPago( this.meter )
                      .subscribe( (resp: any) => {
                        this.totalRegistros = resp.data.total;
                        this.registrosMostrados = resp.data.per_page;
                        this.invoices = resp.data.data;
                        this.cargando = false;
                      });
  }

  procesoFacturacion( order: Order) {

    this.receipt.order_id = order.id;
    this.receipt.user_id = this._usuarioService.usuario.id;
    this.receipt.ammount = order.ammount;

    this._receiptService.crearRecibo( this.receipt )
                        .subscribe( (receipt: any) => {

                          this.invoice.cash_receipt_id = receipt.id;
                          this.invoice.user_id = this._usuarioService.usuario.id;
                          this.invoice.ammount = receipt.ammount;
                          console.log(this.invoice);

                          this._invoiceService.crearFactura( this.invoice )
                                              .subscribe( (invoice: any) => {
                                                Swal.fire({
                                                  icon: 'success',
                                                  title: 'Prceso de Facturación realizado con exito',
                                                  text: 'Recibo No. 0000' + receipt.id + ' y Factura Contable No. 0000 ' + invoice.id
                                                });
                                                this.cargarMedidores( this.zone );
                                                this.hideModalOrderPago();
                                            });
                      });
  }

  payment( invoice: Invoice ) {

    this.invoice = invoice;

    this._invoiceService.payment( this.invoice )
                        .subscribe( (resp: any) => {
                          Swal.fire({
                            icon: 'success',
                            title: 'Proceso de Pago realizado con exito',
                            text: 'Factura No. 0000' + resp.id + ' Pagada'
                          });
                          this.cargarMedidores( this.zone );
                          this.hideModalInvoicePago();
                        });
  }

  cancelInvoice( invoice: Invoice ) {

    this.invoice = invoice;

    if (this.invoice.status === 'Anulado') {

      Swal.fire({
        icon: 'error',
        title: 'Proceso de Anulación fallido',
        text: 'La factura ya se encuentra anulada'
      });

      this.cargarMedidores( this.zone );
      this.hideModalInvoiceLog();

      return true;

    }

    this._invoiceService.cancelInvoice( this.invoice )
                        .subscribe( (resp: any) => {
                          Swal.fire({
                            icon: 'success',
                            title: 'Proceso de Anulación realizado con exito',
                            text: 'Factura No. 0000' + resp.id + ' Anulada'
                          });
                          this.cargarMedidores( this.zone );
                          this.hideModalInvoiceLog();
                        });

  }

}
