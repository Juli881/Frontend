import { Routes } from '@angular/router';

// PAGINAS
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { CompraComponent } from './paginas/compra/compra.component';
import { ComprasComponent } from './paginas/compras/compras.component'; // ← NUEVO IMPORT

// SHARED
import { CarritoComponent } from './Shared/carrito/carrito.component';
import { FavoritosComponent } from './Shared/favoritos/favoritos.component';

// AUTH
import { RegistrarseComponent } from './auth/registrarse/registrarse.component';
import { IniciarSesionComponent } from './auth/iniciar-sesion/iniciar-sesion.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },

  { path: 'inicio', component: InicioComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'favoritos', component: FavoritosComponent },

  { path: 'compra', component: CompraComponent },
  { path: 'mis-compras', component: ComprasComponent }, // ← NUEVA RUTA

  // Auth
  { path: 'registrarse', component: RegistrarseComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent }
];