import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../../servicios/carrito.service';
import { CompraService } from '../../servicios/compra.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  carrito: { producto: any; cantidad: number }[] = [];
  total: number = 0;
  direccion: string = '';
  telefono: string = '';
  error: string | null = null;

  constructor(
    private carritoService: CarritoService,
    private compraService: CompraService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    // Obtenemos productos desde CarritoService
    this.carrito = this.carritoService.obtenerProductos();
    this.total = this.carritoService.obtenerTotal();
    if(this.carrito.length === 0) {
      this.error = 'El carrito está vacío.';
    }
  }

  finalizarCompra(): void {
    if (!this.direccion || !this.telefono) {
      this.error = 'Debes completar la dirección y el teléfono';
      return;
    }

    const usuarioId = this.authService.obtenerUsuarioId();

    this.compraService.crearCompra({
      usuarioId,
      productos: this.carrito,
      total: this.total,
      direccion: this.direccion,
      metodoPago: 'efectivo' // por ejemplo
    }).subscribe({
      next: (res: any) => {
        // Vaciar carrito local
        this.carritoService.vaciarCarrito();
        // Redirigir a ticket
        this.router.navigate(['/ticket', res.id_compra]);
      },
      error: () => {
        this.error = 'Error al procesar la compra.';
      }
    });
  }
}
