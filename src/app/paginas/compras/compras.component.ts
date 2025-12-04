import { Component, OnInit } from '@angular/core';
import { CompraService } from '../../servicios/compra.service';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  compras: any[] = [];
  error: string | null = null;

  constructor(
    private compraService: CompraService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCompras();
  }

  cargarCompras(): void {
    const usuarioId = this.authService.obtenerUsuarioId();
    this.compraService.obtenerComprasUsuario(usuarioId).subscribe({
      next: (res: any[]) => {
        this.compras = res;
      },
      error: () => {
        this.error = 'No se pudieron cargar las compras.';
      }
    });
  }

  verTicket(compraId: number) {
    this.router.navigate(['/ticket', compraId]);
  }
}
