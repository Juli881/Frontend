import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Producto } from '../../model/producto.model';
import { CarritoService } from '../../servicios/carrito.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { UsuarioComponent } from '../usuario/usuario.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    UsuarioComponent   // ⬅️ Ahora sí, existente y correcto
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cantidadProductos: number = 0;
  nombreUsuario: string = 'Invitado';

  constructor(
    private carritoService: CarritoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {


    this.carritoService.carrito$.subscribe((productos: { producto: Producto, cantidad: number }[]) => {
      this.cantidadProductos = productos.reduce(
        (total, item) => total + item.cantidad, 0
      );
    });

    // 👤 Nombre del usuario
    this.usuarioService.nombreUsuario$.subscribe(nombre => {
      this.nombreUsuario = nombre;
    });
  }

  cambiarFondo() {
    let toggle = document.getElementById('toggle') as HTMLInputElement | null;
    let label_toggle = document.getElementById('label_toggle') as HTMLInputElement | null;

    if (toggle) {
      let checked = toggle.checked;
      document.body.classList.toggle('dark-mode', checked);

      if (label_toggle) {
        label_toggle.innerHTML = checked
          ? '<i class="fa-solid fa-sun"></i>'
          : '<i class="fa-regular fa-moon"></i>';
      }
    }
  }
}
