// Interfaces para el sistema de compras

// Producto individual en una compra
export interface ProductoCompra {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagen?: string;
  cantidad: number;
  subtotal: number;
}

// Datos de envío del cliente
export interface DatosEnvio {
  nombre: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  codigo_postal: string;
  telefono: string;
  correo: string;
  metodo_pago: 'tarjeta' | 'efectivo' | 'transferencia';
}

// Compra principal
export interface Compra {
  id: number;
  numero_ticket: string;
  id_usuario: number;
  id_carrito: number;
  fecha: string; // Formato: 'YYYY-MM-DD HH:MM:SS'
  total: number;
  estado: 'pendiente' | 'completada' | 'cancelada';
  detalles: ProductoCompra[];
  datos_envio: DatosEnvio;
}

// Respuesta del historial de compras
export interface HistorialComprasResponse {
  success: boolean;
  message: string;
  compras: Compra[];
  total_compras: number;
  total_gastado: number;
}

// Respuesta del detalle de compra
export interface DetalleCompraResponse {
  success: boolean;
  message: string;
  compra: Compra;
}

// Datos para finalizar una compra
export interface DatosFinalizarCompra {
  cliente: {
    nombre: string;
    correo: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    provincia: string;
    codigo_postal: string;
    metodo_pago: string;
  };
  productos: Array<{
    id_producto: number;
    cantidad: number;
    precio_unitario: number;
  }>;
  subtotal: number;
  envio: number;
  total: number;
}

// Respuesta al finalizar compra
export interface FinalizarCompraResponse {
  success: boolean;
  message: string;
  compra_id: number;
  numero_ticket: string;
  fecha: string;
  total: number;
}

// Estadísticas de compras
export interface EstadisticasCompras {
  total_compras: number;
  compras_completadas: number;
  compras_pendientes: number;
  compras_canceladas: number;
  total_gastado: number;
  promedio_compra: number;
  ultima_compra: string | null;
}

// Filtros para el historial
export interface FiltrosCompras {
  estado?: 'todos' | 'pendiente' | 'completada' | 'cancelada';
  fecha_inicio?: string;
  fecha_fin?: string;
  orden?: 'recientes' | 'antiguos' | 'mayor-total' | 'menor-total';
}

// Para crear una compra nueva
export interface NuevaCompra {
  id_usuario: number;
  productos: Array<{
    id_producto: number;
    cantidad: number;
  }>;
  datos_envio: DatosEnvio;
}

// Para actualizar estado de compra
export interface ActualizarEstadoCompra {
  estado: 'pendiente' | 'completada' | 'cancelada';
  motivo_cancelacion?: string;
}

// Datos para generar ticket PDF
export interface DatosTicket {
  numero_ticket: string;
  fecha: string;
  cliente: {
    nombre: string;
    direccion: string;
    telefono: string;
    correo: string;
  };
  productos: Array<{
    nombre: string;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
  }>;
  subtotal: number;
  envio: number;
  total: number;
  metodo_pago: string;
}