import { CommonModule } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../model/producto.model';
import { CarritoService } from '../../servicios/carrito.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone : true,
  imports: [CommonModule,FormsModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  productosEnCarrito: {producto: Producto; cantidad : number}[] = []

  constructor(private carritoService: CarritoService, private router : Router){}
  ngOnInit(): void {
    this.carritoService.carrito$.subscribe((productos) => {
      this.productosEnCarrito = productos;
    });
  }

  agregarCantidad(index: number){
    this.productosEnCarrito[index].cantidad++;
  }

  quitarCantidad(index:number){
    if(this.productosEnCarrito[index].cantidad > 1){
      this.productosEnCarrito[index].cantidad--;
    }
  }

  eliminarProducto(productoId:number){
    this.carritoService.eliminarDelCarrito(productoId)
  }

  vaciarCarrito(){
    this.carritoService.vaciarCarrito()
  }

 /* realizarCompra(){
    alert('Compra Realizada')
    this.vaciarCarrito()
  }*/

  // Navega al formulario de compra
  irAFormularioCompra(){
    // Redirige al usuario a la ruta '/compra', donde se encuentra el formulario para finalizar la compra
    this.router.navigate(['/compra']);
  }

  // Calcular el total del carrito de compras  
  calcularTotal(): number{
    // Recorre el arreglo de productos en el carrito y suma el resultado de (precio * cantidad) de cada item
    return this.productosEnCarrito.reduce((total, item) =>{
      return total + item.producto.precio * item.cantidad
    },0) // El acumulador 'total' comienza en 0
  }
}