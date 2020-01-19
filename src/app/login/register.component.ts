import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

// Services API
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required )
    });

  }

  registrarUsuario() {

    if (this.forma.invalid) {
      return;
    }

    // tslint:disable-next-line: prefer-const
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario( usuario )
                        .subscribe( resp => {

                          console.log(resp);
                          this.router.navigate(['/login']);

                        });
  }

}
