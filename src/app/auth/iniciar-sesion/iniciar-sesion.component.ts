import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {

  usuario = {
    email: '',
    password: ''
  };

  error: string | null = null;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  iniciarSesion() {
    this.error = null;

    this.authService.login(this.usuario).subscribe({
      next: (respuesta) => {

        // Guardamos el token
        this.authService.guardarToken(respuesta.token);

        // Guardar el nombre en el servicio para mostrarlo en el navbar
        this.usuarioService.setNombreUsuario(respuesta.nombre);

        // Redirigir al inicio
        this.router.navigate(['/inicio']);
      },
      error: () => {
        this.error = 'Credenciales incorrectas. Intenta nuevamente.';
      }
    });
  }
}
