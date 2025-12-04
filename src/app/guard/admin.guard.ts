import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const rol = auth.obtenerRol(); // Debe existir en AuthService

  if (rol === 'admin') {
    return true;
  }

  // Si no tiene rol admin → vuelve al inicio
  router.navigate(['/']);
  return false;
};
