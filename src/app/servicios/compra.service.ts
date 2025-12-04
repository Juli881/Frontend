// CompraService.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private apiUrl = 'http://localhost:3000/compras';

  constructor(private http: HttpClient) {}

  // 🚨 Debe ser público para que lo use CompraComponent
  crearCompra(data: {
    usuarioId: number;
    productos: { producto: Producto; cantidad: number }[];
    total: number;
    direccion: string;
    metodoPago: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  obtenerComprasUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  obtenerCompraPorId(compraId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${compraId}`);
  }
}
