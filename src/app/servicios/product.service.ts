import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/productos'; 
  // Cambia esta URL si tu backend usa otra ruta

  constructor(private http: HttpClient) {}

  // -------------------------
  // OBTENER TODOS LOS PRODUCTOS
  // -------------------------
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // -------------------------
  // OBTENER UN PRODUCTO POR ID
  // -------------------------
  obtenerProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // -------------------------
  // CREAR PRODUCTO (ADMIN)
  // -------------------------
  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  // -------------------------
  // ACTUALIZAR PRODUCTO (ADMIN)
  // -------------------------
  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  // -------------------------
  // ELIMINAR PRODUCTO (ADMIN)
  // -------------------------
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // -------------------------
  // OBTENER PRODUCTOS POR CATEGORÍA
  // -------------------------
  obtenerPorCategoria(categoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}?categoria=${categoria}`);
  }

  // -------------------------
  // OBTENER PRODUCTOS EN OFERTA
  // (si tu backend tiene un campo "oferta" o "destacado")
  // -------------------------
  obtenerOfertas(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}?oferta=true`);
  }
}
