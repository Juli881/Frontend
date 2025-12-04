import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Producto } from '../../model/producto.model';
import { CarritoService } from '../../servicios/carrito.service';
import { FavoritosService } from '../../servicios/favoritos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Guitarra eléctrica Jackson JS Series JS11',
      descripcion: 'La Jackson JS Series es una guitarra eléctrica de nivel intermedio que combina un diseño agresivo con buen rendimiento.',
      precio: 454770,
      imagen: 'assets/guitarra1.png',
      disponibilidad: true,
      categoria: 'Guitarras',
      marca: 'Jackson'
    },
    {
      id: 2,
      nombre: 'Gibson Les Paul Standard 60s',
      descripcion: 'Una guitarra icónica con un cuerpo sólido de caoba, tapa de arce y pastillas Burstbucker que ofrecen un tono clásico con sustain infinito.',
      precio: 1050000,
      imagen: 'assets/guitarra2.png',
      disponibilidad: true,
      categoria: 'Guitarras',
      marca: 'Gibson'
    },
    {
      id: 3,
      nombre: 'Fender Stratocaster Player Series',
      descripcion: 'Cuerpo de aliso, mástil en forma de "C moderna", y tres pastillas single coil. Perfecta para blues, rock y funk.',
      precio: 699000,
      imagen: 'assets/guitarra3.jpg',
      disponibilidad: true,
      categoria: 'Guitarras',
      marca: 'Fender'
    },
    {
      id: 4,
      nombre: 'Ibanez RG450DX',
      descripcion: 'Diseñada para velocidad y técnica, con trémolo Edge-Zero II y mástil Wizard III ultrarápido.',
      precio: 350000,
      imagen: 'assets/guitarra4.png',
      disponibilidad: true,
      categoria: 'Guitarras',
      marca: 'Ibanez'
    },
    {
      id: 5,
      nombre: 'Kramer Original Collection VT-211S',
      descripcion: 'Guitarra estilo Strat con gran versatilidad. Ideal para principiantes y músicos intermedios.',
      precio: 240000,
      imagen: 'assets/guitarra5.png',
      disponibilidad: true,
      categoria: 'Guitarras',
      marca: 'Kramer'
    },
    {
      id: 6,
      nombre: 'ESP LTD EC-256',
      descripcion: 'Con cuerpo tipo Les Paul, pastillas humbucker y diseño moderno. Gran relación calidad-precio.',
      precio: 290000,
      imagen: 'assets/guitarra6.png',
      disponibilidad: true,
      categoria: 'Guitarras',
      marca: 'ESP'
    },
    {
      id: 7,
      nombre: 'Yamaha Pacifica 112V',
      descripcion: 'Guitarra ideal para iniciarse, con gran tono y excelente construcción.',
      precio: 180000,
      imagen: 'assets/guitarra7.jpg',
      disponibilidad: true,
      categoria: 'Guitarras',
      marca: 'Yamaha'
    },
    {
      id: 8,
      nombre: 'PRS SE Standard 24',
      descripcion: 'Con pastillas humbucker y trémolo, es una opción versátil para diversos estilos musicales.',
      precio: 410000,
      imagen: 'assets/guitarra8.png',
      disponibilidad: true,
      categoria: 'Guitarras',
      marca: 'PRS SE'
    }
  ];

  // Seccion: Amplificadores
  amplificadores: Producto[] = [
    {
      id: 101,
      nombre: 'Fender Champion 40',
      descripcion: 'Amplificador versátil con efectos integrados, ideal para práctica y escenario.',
      precio: 124999,
      imagen: 'assets/amplificador1.png',
      disponibilidad: true,
      categoria: 'amplificadores',
      marca: 'Fender'
    },
    {
      id: 102,
      nombre: 'Marshall MG15GFX',
      descripcion: 'Compacto pero potente, con efectos digitales y diseño clásico Marshall.',
      precio: 99999,
      imagen: 'assets/amplificador2.png',
      disponibilidad: true,
      categoria: 'amplificadores',
      marca: 'Marshall'
    },
    {
      id: 103,
      nombre: 'Boss Katana 50 MKII',
      descripcion: 'Amplificador de modelado digital con 50W de potencia y gran respuesta dinámica.',
      precio: 159999,
      imagen: 'assets/amplificador3.png',
      disponibilidad: true,
      categoria: 'amplificadores',
      marca: 'Boss'
    },
    {
      id: 104,
      nombre: 'Orange Crush 20RT',
      descripcion: 'Sonido británico con distorsión poderosa y afinador incorporado.',
      precio: 114999,
      imagen: 'assets/amplificador4.png',
      disponibilidad: true,
      categoria: 'amplificadores',
      marca: 'Orange Crush'
    },
    {
      id: 105,
      nombre: 'LANEY LX10 LANEY',
      descripcion: 'Amplificador combo compacto de 10 watts.',
      precio: 170700,
      imagen: 'assets/amplificador 105.png',
      disponibilidad: true,
      categoria: 'amplificadores',
      marca: 'Laney'
    },
    {
      id: 106,
      nombre: 'LANEY LX65R LANEY',
      descripcion: 'Amplificador combo de 65W con parlante de 12".',
      precio: 648567,
      imagen: 'assets/amplificador106.png',
      disponibilidad: true,
      categoria: 'amplificadores',
      marca: 'Laney'
    }
  ];
  // Seccion Vinilos 
  vinilos: Producto[] = [
  {
    id: 201,
    nombre: 'Disintegration (Vinilo) [Importado]',
    descripcion: 'The Cure.',
    precio: 4500,
    imagen: 'assets/Disintegration.jpg',
    disponibilidad: true,
    categoria: 'Vinilos',
    marca: 'Apple Records'
  },
  {
    id: 202,
    nombre: 'Paranoid (Vinilo)',
    descripcion: 'Vinilo edición limitada, por Black Sabbath.',
    precio: 6000,
    imagen: 'assets/Paranoid.jpg',
    disponibilidad: true,
    categoria: 'Vinilos',
    marca: 'Apple Records'
  }

];


  constructor(
    private carritoService: CarritoService,
    private FavoritosService: FavoritosService
  ) { }

  agregar(producto: Producto): void {
    if (producto.disponibilidad) {
      this.carritoService.agregarAlcarrito(producto);
      alert('Producto agregado al carrito');
    } else {
      alert('Producto no disponible');
    }
  }

  agregarAFavoritos(producto: Producto): void {
    if (producto.disponibilidad) {
      this.FavoritosService.agregarAFavoritos(producto);
      alert('Producto agregado a favoritos');
    } else {
      alert('Producto no disponible');
    }
  }

  searchTerm: string = '';
  selectedCategory: string = '';
  selectedBrand: string = '';
  minprecio: number | null = null;
  maxprecio: number | null = null;

get categories(): string[] {
  const todas = [...this.productos, ...this.amplificadores, ...this.vinilos];
  return [...new Set(todas.map(p => p.categoria))];
}

get marca(): string[] {
  const todas = [...this.productos, ...this.amplificadores];
  return [...new Set(todas.map(p => p.marca))];
}


  onSearch(event: Event): void {
    event.preventDefault();
  }
  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedBrand = '';
    this.minprecio = null;
    this.maxprecio = null;
  }

  get filteredProducts(): Producto[] {
    const todos = [...this.productos, ...this.amplificadores];

    return todos.filter(p =>
      (this.searchTerm === '' || p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (this.selectedCategory === '' || p.categoria === this.selectedCategory) &&
      (this.selectedBrand === '' || p.marca === this.selectedBrand) &&
      (this.minprecio === null || p.precio >= this.minprecio) &&
      (this.maxprecio === null || p.precio <= this.maxprecio)
    );
  }
}
