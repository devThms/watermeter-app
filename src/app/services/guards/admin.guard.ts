import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService
  ) { }

  canActivate() {

    if (this._usuarioService.usuario.role_id === 1) {
      return true;
    } else {
      console.log('Bloqueado por el AdminGuard');
      this._usuarioService.logout();
      return false;
    }

  }
}
