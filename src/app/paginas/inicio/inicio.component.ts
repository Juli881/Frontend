import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../model/producto.model';
import { CarritoService } from '../../servicios/carrito.service';
import { FavoritosService } from '../../servicios/favoritos.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Guitarra eléctrica Jackson JS Series JS11',
      descripcion: 'Esta guitarra Dinky se caracteriza por su liviandad...',
      precio: 454770,
      imagen: 'assets/guitarra1.png',
      disponibilidad: true,
      categoria: 'Guitarras',
      marca: 'Jackson'
    },
    {
      id: 2,
      nombre: 'Gibson Les Paul Standard 60s',
      descripcion: 'Una guitarra icónica con un cuerpo sólido de caoba...',
      precio: 1050000,
      imagen: 'assets/guitarra2.png',
      disponibilidad: true,
      categoria: 'Guitarras',
      marca: 'Gibson'
    },
    {
      id: 3,
      nombre: 'Guitarra eléctrica Yamaha ERG121',
      descripcion: 'Guitarra eléctrica de diseño clásico, ideal para principiantes y músicos intermedios.',
      precio: 1350000,
      imagen: 'assets/guitarra7.jpg',
      disponibilidad: true,
      categoria: 'Guitarras',
      marca: 'Yamaha'
    },
    {
      id: 4,
      nombre: 'PRS SE Custom 24',
      descripcion: 'Versátil guitarra con cuerpo de caoba y mástil de arce.',
      precio: 980000,
      imagen: 'assets/guitarra10.png',
      disponibilidad: true,
      categoria: 'Guitarras',
      marca: 'PRS'
    },
    {
      id: 5,
      nombre: 'Ibanez RG550',
      descripcion: 'Guitarra eléctrica de alta velocidad con puente flotante y pastillas humbucker.',
      precio: 820000,
      imagen: 'assets/guitarra5.png',
      disponibilidad: true,
      categoria: 'Guitarras',
      marca: 'Ibanez'
    }
  ];

  amplificadores: Producto[] = [
    {
      id: 101,
      nombre: 'Peavey Backstage 2',
      descripcion: 'Amplificador a válvulas de 10W con gran versatilidad tonal.',
      precio: 1500000,
      imagen: 'assets/amplificador8.png',
      disponibilidad: true,
      categoria: 'Amplificadores',
      marca: 'Peavey'
    },
    {
      id: 102,
      nombre: 'Fender Champion 20',
      descripcion: 'Amplificador combo de 20W ideal para principiantes y práctica.',
      precio: 350000,
      imagen: 'assets/amplificador2.png',
      disponibilidad: true,
      categoria: 'Amplificadores',
      marca: 'Fender'
    },
    {
      id: 103,
      nombre: 'Vox AC15C1',
      descripcion: 'Clásico amplificador de 15W con sonido británico y excelente claridad.',
      precio: 900000,
      imagen: 'assets/amplificador3.png',
      disponibilidad: true,
      categoria: 'Amplificadores',
      marca: 'Vox'
    },
    {
      id: 104,
      nombre: 'Blackstar HT-5R',
      descripcion: 'Amplificador a válvulas compacto de 5W con reverb integrada.',
      precio: 600000,
      imagen: 'assets/amplificador4.png',
      disponibilidad: true,
      categoria: 'Amplificadores',
      marca: 'Blackstar'
    },
    {
      id: 105,
      nombre: 'Sunset Ampli 10W',
      descripcion: 'Potencia y calidad en un diseño compacto y de caja cerrada que mejora la resonancia.',
      precio: 700000,
      imagen: 'assets/amplificador7.png',
      disponibilidad: true,
      categoria: 'Amplificadores',
      marca: 'Sunset'
    }
  ];

  constructor(
    private carritoService: CarritoService,
    private favoritosService: FavoritosService
  ) {}

  agregarAlCarrito(producto: Producto): void {
    if (producto.disponibilidad) {
      this.carritoService.agregarAlcarrito(producto);
      alert('Producto agregado al carrito');
    }
  }

  agregarAFavoritos(producto: Producto): void {
    if (producto.disponibilidad) {
      this.favoritosService.agregarAFavoritos(producto);
      alert('Producto agregado a favoritos');
    }
  }
}
