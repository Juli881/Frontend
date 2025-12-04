import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private nombreUsuarioSubject = new BehaviorSubject<string>('Invitado');
  nombreUsuario$ = this.nombreUsuarioSubject.asObservable();

  constructor() {}

  setNombreUsuario(nombre: string) {
    this.nombreUsuarioSubject.next(nombre);
  }

  // Compatibilidad: algunos componentes llaman `setNombre`.
  setNombre(nombre: string) {
    this.setNombreUsuario(nombre);
  }

  logout() {
    this.nombreUsuarioSubject.next('Invitado');
  }
}
