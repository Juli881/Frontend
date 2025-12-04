import { Injectable } from '@angular/core';
 import { BehaviorSubject } from 'rxjs';
import { Producto } from '../model/producto.model';


@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
private favoritosSubject= new BehaviorSubject<{producto: Producto; cantidad: number}[]>([]);
   favoritos$= this.favoritosSubject.asObservable()


 agregarAFavoritos(producto: Producto) {
  const productos = this.favoritosSubject.getValue();
  const index = productos.findIndex(p => p.producto.id === producto.id);

  if (index !== -1) {

    const productosActualizados = [...productos];
    productosActualizados[index] = {
      ...productosActualizados[index],
      cantidad: productosActualizados[index].cantidad + 1
    };
    this.favoritosSubject.next(productosActualizados);
  } else {
    this.favoritosSubject.next([...productos, { producto, cantidad: 1 }]);
  }
}

 
   eliminarFavorito(productoId: number){
     const productos = this.favoritosSubject.getValue().filter(p => p.producto.id !== productoId)
     this.favoritosSubject.next(productos)
   }
   vaciarFavorito(){
     this.favoritosSubject.next([])
   }
   constructor() { }
}
