import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compra, HistorialComprasResponse } from '../model/compra.model';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private apiUrl = 'http://localhost/api_proyecto/public';

  constructor(private http: HttpClient) { }

  // Finalizar compra (ya existe)
  finalizarCompra(datosCompra: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/compras/finalizar`, datosCompra);
  }

  // Obtener historial de compras (NUEVO)
  obtenerHistorialCompras(): Observable<HistorialComprasResponse> {
    return this.http.get<HistorialComprasResponse>(`${this.apiUrl}/compras`);
  }

  // Obtener detalles de una compra específica (NUEVO)
  obtenerDetalleCompra(idCompra: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/compras/${idCompra}`);
  }

  // Cancelar una compra (NUEVO)
  cancelarCompra(idCompra: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/compras/${idCompra}/cancelar`, {});
  }

  // Descargar ticket PDF (NUEVO)
  descargarTicket(idCompra: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tickets/${idCompra}`, {
      responseType: 'blob'  // Importante para archivos
    });
  }

  // Generar estadísticas (NUEVO)
  obtenerEstadisticas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/compras/estadisticas`);
  }
}