import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../model/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carritoSubject = new BehaviorSubject<{ producto: Producto; cantidad: number }[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  private apiUrl = 'http://localhost:3000/carrito'; // Ajusta según tu backend

  constructor(private http: HttpClient) {
    this.cargarCarritoLocal();
  }

  // -----------------------
  // LOCAL STORAGE
  // -----------------------
  private cargarCarritoLocal() {
    const data = localStorage.getItem('carrito');
    const carrito = data ? JSON.parse(data) : [];
    this.carritoSubject.next(carrito);
  }

  private guardarCarritoLocal() {
    localStorage.setItem('carrito', JSON.stringify(this.carritoSubject.getValue()));
  }

  // -----------------------
  // AGREGAR PRODUCTO
  // -----------------------
  agregarAlcarrito(producto: Producto, usuarioId?: number) {
    const productos = this.carritoSubject.getValue();
    const encontrado = productos.find(p => p.producto.id === producto.id);

    if (encontrado) {
      encontrado.cantidad++;
    } else {
      productos.push({ producto, cantidad: 1 });
    }

    this.carritoSubject.next([...productos]);
    this.guardarCarritoLocal();

    // Si hay usuario logueado, enviar al backend
    if (usuarioId) {
      this.http.post(`${this.apiUrl}/agregar`, { usuarioId, productoId: producto.id }).subscribe();
    }
  }

  // -----------------------
  // ELIMINAR PRODUCTO
  // -----------------------
  eliminarDelCarrito(productoId: number, usuarioId?: number) {
    const productos = this.carritoSubject.getValue().filter(p => p.producto.id !== productoId);
    this.carritoSubject.next(productos);
    this.guardarCarritoLocal();

    if (usuarioId) {
      this.http.delete(`${this.apiUrl}/eliminar/${usuarioId}/${productoId}`).subscribe();
    }
  }

  // -----------------------
  // VACIAR CARRITO
  // -----------------------
  vaciarCarrito(usuarioId?: number) {
    this.carritoSubject.next([]);
    this.guardarCarritoLocal();

    if (usuarioId) {
      this.http.delete(`${this.apiUrl}/vaciar/${usuarioId}`).subscribe();
    }
  }

  // -----------------------
  // OBTENER PRODUCTOS
  // -----------------------
  obtenerProductos(): { producto: Producto; cantidad: number }[] {
    return this.carritoSubject.getValue();
  }

  // -----------------------
  // TOTAL
  // -----------------------
  obtenerTotal(): number {
    return this.carritoSubject.getValue().reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  }

  // -----------------------
  // CARGAR CARRITO DESDE BACKEND
  // -----------------------
  cargarCarritoBackend(usuarioId: number): Observable<any> {
    if (!usuarioId) return of([]);
    return this.http.get<any>(`${this.apiUrl}/usuario/${usuarioId}`);
  }
}
