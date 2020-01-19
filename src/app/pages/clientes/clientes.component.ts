import { Component, OnInit } from '@angular/core';

import { Paginate } from '../../models/paginate.model';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

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
    public _customerService: CustomerService
  ) { }

  ngOnInit() {
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
    this.customer.NIT = null;
    this.customer.firstName = null;
    this.customer.lastName = null;
    this.customer.address = null;
    this.customer.telephone = null;
    this.cargarClientes();
  }

  showModalUpdate( customer: Customer ) {
    this.customer = customer;
    this.modalUpdate = '';
  }

  cargarClientes( page: string = null ) {

    this.cargando = true;

    this._customerService.cargarClientes( page )
                        .subscribe( (resp: any) => {

                          this.pages.previous = resp.data.prev_page_url;
                          this.pages.next = resp.data.next_page_url;
                          this.pages.inicializar();

                          this.totalRegistros = resp.data.total;
                          this.registrosMostrados = resp.data.per_page;
                          this.customers = resp.data.data;
                          this.cargando = false;
                        });

  }


  crearCliente( customer: Customer ) {

    this.customer = customer;

    this._customerService.crearCliente( this.customer )
                      .subscribe( (resp: any) => {
                          Swal.fire({
                            icon: 'success',
                            title: 'Cliente Creado',
                            text: customer.firstName + ' ' + customer.lastName
                          });
                          this.cargarClientes();
                          this.hideModalCreate();
                      });
  }

  actualizarCliente( customer: Customer ) {

    this.customer = customer;

    this._customerService.actualizarCliente( this.customer )
                      .subscribe( (resp: any) => {
                        Swal.fire({
                          type: 'success',
                          title: 'Cliente Actualizado',
                          text: customer.firstName + ' ' + customer.lastName
                        });
                        this.cargarClientes();
                        this.hideModalUpdate();
                      });
  }

  borrarCliente( customer: Customer ) {

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

        this._customerService.borrarCliente( customer )
                            .subscribe( borrado => {
                              console.log(borrado);
                              this.cargarClientes();
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
