import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="usuario-nav text-center">
      <i class="bi bi-person-circle fs-3"></i>
      <div class="nombre-usuario mt-1">
        {{ nombre }}
      </div>
    </div>
  `,
  styles: [`
    .usuario-nav {
      cursor: pointer;
      color: white;
    }

    .nombre-usuario {
      font-size: 14px;
      font-weight: 500;
    }
  `]
})
export class UsuarioComponent {
  @Input() nombre: string = 'Invitado';

  constructor(private usuarioService: UsuarioService) {
    this.usuarioService.nombreUsuario$.subscribe(nombre => {
      this.nombre = nombre;
    });
  }
}
