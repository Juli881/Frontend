import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent {

  // Inyección del servicio
  constructor(private usuarioService: UsuarioService) {}

  formularioRegistro = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: this.passwordsIguales });

  // Validación personalizada para contraseña
  passwordsIguales(control: AbstractControl): ValidationErrors | null {
    const pass = control.get('password')?.value;
    const confirmPass = control.get('confirmPassword')?.value;
    if (pass !== confirmPass) {
      return { noSonIguales: true };
    }
    return null;
  }

  // Acción al enviar el formulario
  registrarse() {
    if (this.formularioRegistro.invalid) {
      this.formularioRegistro.markAllAsTouched();
      return;
    }

    const nombre = this.formularioRegistro.value.nombre;
    this.usuarioService.setNombre(nombre || 'Usuario'); // <-- Aquí se guarda el nombre

    console.log('Datos de usuario:', this.formularioRegistro.value);
    alert('Cuenta creada exitosamente!');
    this.formularioRegistro.reset();
  }
}
