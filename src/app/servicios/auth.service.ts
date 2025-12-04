import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL base de tu backend PHP
  private apiUrl = 'http://localhost/api_proyecto';

  constructor(private http: HttpClient) {}

  // ======================================
  // LOGIN
  // ======================================
  login(credenciales: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login.php`, credenciales);
  }

  // ======================================
  // REGISTRO
  // ======================================
  registrar(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro.php`, datos);
  }

  // ======================================
  // GUARDAR DATOS EN LOCALSTORAGE
  // ======================================
  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string {
    return localStorage.getItem('token') || '';
  }

  guardarNombre(nombre: string) {
    localStorage.setItem('nombre', nombre);
  }

  obtenerNombre(): string {
    return localStorage.getItem('nombre') || '';
  }

  guardarRol(rol: string) {
    localStorage.setItem('rol', rol);
  }

  obtenerRol(): string {
    return localStorage.getItem('rol') || '';
  }

  guardarUsuarioId(id: number) {
    localStorage.setItem('usuarioId', id.toString());
  }

  obtenerUsuarioId(): number {
    return Number(localStorage.getItem('usuarioId')) || 0;
  }

  // ======================================
  // ESTADO DE AUTENTICACIÓN
  // ======================================
  estaAutenticado(): boolean {
    return localStorage.getItem('token') !== null;
  }

  esAdmin(): boolean {
    return this.obtenerRol() === 'admin';
  }

  // ======================================
  // CERRAR SESIÓN
  // ======================================
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rol');
    localStorage.removeItem('usuarioId');
  }
}
