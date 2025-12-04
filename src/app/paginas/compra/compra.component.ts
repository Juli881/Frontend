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
    const usuarioId = this.authService.obtenerUsuarioId();
    this.carritoService.cargarCarritoBackend(usuarioId).subscribe({
      next: (res) => {
        this.carrito = res;
        this.total = this.carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
        if (this.carrito.length === 0) {
          this.error = 'El carrito está vacío.';
        }
      },
      error: () => {
        this.error = 'No se pudo cargar el carrito.';
      }
    });
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
      metodoPago: 'efectivo'
    }).subscribe({
      next: (res: any) => {
        this.carritoService.vaciarCarrito(usuarioId);
        this.router.navigate(['/ticket', res.id_compra]);
      },
      error: () => {
        this.error = 'Error al procesar la compra.';
      }
    });
  }
}
