import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// Services API
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame = false;
  correo = '';

  constructor(
    private router: Router,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.correo = localStorage.getItem('email') || '';

    if (this.correo.length > 0) {
      this.recuerdame = true;
    }
  }

  ingresar( forma: NgForm ) {

    if ( !forma.valid ) {
      return;
    }

    const usuario = new Usuario(
      null,
      forma.value.correo,
      forma.value.password
    );

    this._usuarioService.login( usuario, forma.value.recuerdame )
                        .subscribe( correcto => this.router.navigate(['/dashboard']));

  }

}
