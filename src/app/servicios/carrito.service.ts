import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Producto } from '../model/producto.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carritoSubject = new BehaviorSubject<{ producto: Producto; cantidad: number }[]>(this.cargarCarrito());
  carrito$ = this.carritoSubject.asObservable();

  private apiUrl = 'http://localhost:3000/carrito'; // Ajusta según tu backend

  constructor(private http: HttpClient, private authService: AuthService) {}

  // ------------------------------
  // AGREGAR PRODUCTO
  // ------------------------------
  agregarAlcarrito(producto: Producto, usuarioId?: number): void {
    const id = usuarioId || this.authService.obtenerUsuarioId();
    const productos = this.carritoSubject.getValue();
    const encontrado = productos.find(p => p.producto.id === producto.id);

    if (encontrado) {
      encontrado.cantidad++;
    } else {
      productos.push({ producto, cantidad: 1 });
    }

    this.carritoSubject.next([...productos]);
    this.guardarCarrito();

    // Opcional: sincronizar con backend
    if (id) {
      this.http.post(`${this.apiUrl}/agregar`, { usuarioId: id, productoId: producto.id }).subscribe();
    }
  }

  // ------------------------------
  // ELIMINAR PRODUCTO
  // ------------------------------
  eliminarDelCarrito(productoId: number, usuarioId?: number): void {
    const id = usuarioId || this.authService.obtenerUsuarioId();
    const productos = this.carritoSubject.getValue().filter(p => p.producto.id !== productoId);
    this.carritoSubject.next(productos);
    this.guardarCarrito();

    if (id) {
      this.http.delete(`${this.apiUrl}/eliminar/${productoId}?usuarioId=${id}`).subscribe();
    }
  }

  // ------------------------------
  // VACIAR CARRITO
  // ------------------------------
  vaciarCarrito(usuarioId?: number): void {
    const id = usuarioId || this.authService.obtenerUsuarioId();
    this.carritoSubject.next([]);
    this.guardarCarrito();

    if (id) {
      this.http.delete(`${this.apiUrl}/vaciar?usuarioId=${id}`).subscribe();
    }
  }

  // ------------------------------
  // OBTENER PRODUCTOS LOCALES
  // ------------------------------
  obtenerProductos(): { producto: Producto; cantidad: number }[] {
    return this.carritoSubject.getValue();
  }

  // ------------------------------
  // TOTAL GENERAL
  // ------------------------------
  obtenerTotal(): number {
    const productos = this.carritoSubject.getValue();
    return productos.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  }

  // ------------------------------
  // LOCAL STORAGE
  // ------------------------------
  private guardarCarrito(): void {
    localStorage.setItem('carrito', JSON.stringify(this.carritoSubject.getValue()));
  }

  private cargarCarrito(): { producto: Producto; cantidad: number }[] {
    const data = localStorage.getItem('carrito');
    return data ? JSON.parse(data) : [];
  }

  // ------------------------------
  // CARGAR CARRITO DESDE BACKEND
  // ------------------------------
  cargarCarritoBackend(usuarioId: number): Observable<{ producto: Producto; cantidad: number }[]> {
    if (!usuarioId) return of([]);
    return this.http.get<{ producto: Producto; cantidad: number }[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }
}
