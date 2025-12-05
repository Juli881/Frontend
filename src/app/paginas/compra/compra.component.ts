import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  // Datos del formulario
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  direccion: string = '';
  ciudad: string = '';
  provincia: string = '';
  codigoPostal: string = '';
  metodoPago: string = 'tarjeta';
  
  // Variables de cálculo
  subtotal: number = 0;
  envio: number = 7500;
  total: number = 0;
  
  // Estado
  mostrarTicket: boolean = false;
  ticketNumero: string = '';
  compraCompletada: boolean = false;
  mensajeError: string = '';

  // Datos simulados del carrito (en caso de que el servicio falle)
  productosCarrito: any[] = [];

  ngOnInit(): void {
    this.cargarCarrito();
    this.calcularTotales();
  }

  // Cargar carrito desde localStorage como fallback
  cargarCarrito(): void {
    try {
      // Si tienes un servicio real, úsalo
      // this.productosCarrito = this.carritoService.obtenerProductos();
      
      // Fallback a localStorage
      const carritoStorage = localStorage.getItem('carrito');
      if (carritoStorage) {
        this.productosCarrito = JSON.parse(carritoStorage);
      } else {
        this.productosCarrito = [];
      }
    } catch (error) {
      console.error('Error cargando carrito:', error);
      this.productosCarrito = [];
    }
  }

  // Calcular totales
  calcularTotales(): void {
    this.subtotal = this.calcularSubtotal();
    this.total = this.subtotal + this.envio;
  }

  calcularSubtotal(): number {
    return this.productosCarrito.reduce((total, item) => {
      const precio = item.producto?.precio || item.precio || 0;
      const cantidad = item.cantidad || 1;
      return total + (precio * cantidad);
    }, 0);
  }

  // Verificar si el carrito está vacío
  carritoVacio(): boolean {
    return this.productosCarrito.length === 0;
  }

  // Obtener productos (para el template)
  obtenerProductos(): any[] {
    return this.productosCarrito;
  }

  // Validar formulario
  validarFormulario(): boolean {
    this.mensajeError = '';
    
    if (!this.nombre.trim()) {
      this.mensajeError = 'El nombre es obligatorio';
      return false;
    }
    
    if (!this.correo.trim() || !this.correo.includes('@')) {
      this.mensajeError = 'Correo electrónico inválido';
      return false;
    }
    
    if (!this.telefono.trim()) {
      this.mensajeError = 'El teléfono es obligatorio';
      return false;
    }
    
    if (!this.direccion.trim()) {
      this.mensajeError = 'La dirección es obligatoria';
      return false;
    }
    
    if (!this.ciudad.trim()) {
      this.mensajeError = 'La ciudad es obligatoria';
      return false;
    }
    
    if (!this.provincia.trim()) {
      this.mensajeError = 'La provincia es obligatoria';
      return false;
    }
    
    if (!this.codigoPostal.trim()) {
      this.mensajeError = 'El código postal es obligatorio';
      return false;
    }
    
    if (!this.metodoPago) {
      this.mensajeError = 'Seleccione un método de pago';
      return false;
    }
    
    return true;
  }

  // Finalizar compra
  finalizarCompra(): void {
    if (!this.validarFormulario()) {
      alert(this.mensajeError);
      return;
    }
    
    if (this.carritoVacio()) {
      alert('El carrito está vacío. Agrega productos antes de comprar.');
      return;
    }
    
    // Generar número de ticket
    this.ticketNumero = 'TICK-' + Date.now().toString().slice(-8);
    
    // Mostrar ticket
    this.mostrarTicket = true;
    this.compraCompletada = true;
    
    // Vaciar carrito
    this.vaciarCarrito();
    
    // Mostrar mensaje de éxito
    setTimeout(() => {
      alert(`✅ ¡Compra exitosa!\n\nTicket: ${this.ticketNumero}\nTotal: $${this.total.toFixed(2)}\n\nGracias por tu compra, ${this.nombre}!`);
    }, 100);
  }

  // Vaciar carrito
  vaciarCarrito(): void {
    this.productosCarrito = [];
    localStorage.removeItem('carrito');
  }

  // Cerrar ticket
  cerrarTicket(): void {
    this.mostrarTicket = false;
    // Redirigir a inicio
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  }

  // Obtener fecha actual formateada
  getFechaActual(): string {
    return new Date().toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}