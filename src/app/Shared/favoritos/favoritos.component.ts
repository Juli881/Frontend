import { Component, OnInit } from '@angular/core';
import { Producto } from '../../model/producto.model';
import { FavoritosService } from '../../servicios/favoritos.service';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-favoritos',
  imports: [CommonModule]  ,
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
  
})
export class FavoritosComponent implements OnInit {
  productosEnFavorito: { producto: Producto; cantidad: number }[] = [];

  constructor(private favoritosService: FavoritosService) {}

  ngOnInit(): void {
    this.favoritosService.favoritos$.subscribe((productos) => {
      console.log('Productos en favoritos:', productos); 
      this.productosEnFavorito = productos;
    });
  }

  agregarCantidad(index: number) {
    this.productosEnFavorito[index].cantidad++;
  }

 /* quitarCantidad(index: number) {
    if (this.productosEnFavorito[index].cantidad > 1) {
      this.productosEnFavorito[index].cantidad--;
    }
  }
*/ 

  eliminarFavorito(productoId: number) {
    this.favoritosService.eliminarFavorito(productoId);
  }

  vaciarFavorito() {
    this.favoritosService.vaciarFavorito();
  }

  realizarFavorito() {
    alert('Añadido a favoritos');
    this.vaciarFavorito();
  }
}
