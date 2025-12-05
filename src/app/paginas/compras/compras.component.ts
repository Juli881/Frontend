import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  compras: any[] = [];
  comprasFiltradas: any[] = [];
  
  cargando: boolean = true;
  error: string = '';
  
  filtroEstado: string = 'todos';
  ordenamiento: string = 'recientes';
  
  totalGastado: number = 0;
  totalCompras: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarCompras();
  }

  cargarCompras(): void {
    this.cargando = true;
    this.error = '';
    
    // Obtener token del localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.error = 'No estás autenticado. Inicia sesión para ver tus compras.';
      this.cargarDatosEjemplo();
      return;
    }
    
    // URL CORRECTA según tu backend
    const url = 'http://localhost/api_proyecto/public/compras';
    
    // Configurar headers con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    this.http.get(url, { headers }).subscribe({
      next: (response: any) => {
        console.log('✅ Respuesta del backend:', response);
        
        // Tu backend devuelve { "compras": [...] }
        if (response && Array.isArray(response.compras)) {
          this.compras = response.compras;
          this.manejarDatosCargados();
        } else if (response && response.error) {
          this.error = response.error;
          this.cargarDatosEjemplo();
        } else {
          this.error = 'Formato de respuesta inesperado';
          this.cargarDatosEjemplo();
        }
      },
      error: (err) => {
        console.error('❌ Error del backend:', err);
        this.error = 'No se pudo conectar al servidor. Mostrando datos de ejemplo.';
        this.cargarDatosEjemplo();
      }
    });
  }

  cargarDatosEjemplo(): void {
    // Solo usar ejemplos si hay error
    if (this.compras.length === 0) {
      this.compras = [
        {
          id: 1,
          numero_ticket: 'TICK-20231215-001',
          fecha: '2023-12-15 14:30:00',
          total: 25499.99,
          estado: 'completada',
          cantidad_productos: 2
        },
        {
          id: 2,
          numero_ticket: 'TICK-20231214-002',
          fecha: '2023-12-14 11:15:00',
          total: 8999.50,
          estado: 'completada',
          cantidad_productos: 1
        },
        {
          id: 3,
          numero_ticket: 'TICK-20231213-003',
          fecha: '2023-12-13 16:45:00',
          total: 15750.00,
          estado: 'pendiente',
          cantidad_productos: 1
        }
      ];
    }
    
    this.manejarDatosCargados();
  }

  manejarDatosCargados(): void {
    this.comprasFiltradas = [...this.compras];
    this.totalCompras = this.compras.length;
    this.totalGastado = this.calcularTotalGastado();
    this.aplicarFiltros();
    this.cargando = false;
  }

  aplicarFiltros(): void {
    let resultado = [...this.compras];
    
    if (this.filtroEstado !== 'todos') {
      resultado = resultado.filter(compra => compra.estado === this.filtroEstado);
    }
    
    switch (this.ordenamiento) {
      case 'recientes':
        resultado.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        break;
      case 'antiguos':
        resultado.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
        break;
      case 'mayor-total':
        resultado.sort((a, b) => b.total - a.total);
        break;
      case 'menor-total':
        resultado.sort((a, b) => a.total - b.total);
        break;
    }
    
    this.comprasFiltradas = resultado;
  }

  cambiarFiltro(estado: string): void {
    this.filtroEstado = estado;
    this.aplicarFiltros();
  }

  cambiarOrden(): void {
    this.aplicarFiltros();
  }

  calcularTotalGastado(): number {
    return this.compras
      .filter(c => c.estado === 'completada')
      .reduce((total, compra) => total + compra.total, 0);
  }

  contarComprasPorEstado(estado: string): number {
    return this.compras.filter(c => c.estado === estado).length;
  }

  formatearFecha(fecha: string): string {
    try {
      return new Date(fecha).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return fecha;
    }
  }

  formatearMoneda(valor: number): string {
    return '$' + valor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  getClaseEstado(estado: string): string {
    switch(estado) {
      case 'completada': return 'badge bg-success';
      case 'pendiente': return 'badge bg-warning text-dark';
      case 'cancelada': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }

  getTextoEstado(estado: string): string {
    switch(estado) {
      case 'completada': return 'Completada';
      case 'pendiente': return 'Pendiente';
      case 'cancelada': return 'Cancelada';
      default: return estado;
    }
  }

  calcularTotalFiltrado(): number {
    return this.comprasFiltradas.reduce((total, compra) => total + compra.total, 0);
  }

  // Refrescar
  refrescar(): void {
    this.cargando = true;
    this.cargarCompras();
  }
}