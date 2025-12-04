import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://localhost:3000/tickets'; 
  // Cambiar si tu backend usa otra ruta

  constructor(private http: HttpClient) {}

  // -----------------------------------------
  // OBTENER TICKET POR ID desde backend
  // -----------------------------------------
  obtenerTicket(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // -----------------------------------------
  // GENERAR PDF DEL TICKET (FRONTEND)
  // -----------------------------------------
  generarPDF(ticket: any) {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('TICKET DE COMPRA', 70, 20);

    doc.setFontSize(12);
    doc.text(`Ticket ID: ${ticket.id}`, 20, 40);
    doc.text(`Fecha: ${ticket.fecha}`, 20, 50);
    doc.text(`Usuario: ${ticket.usuario}`, 20, 60);

    doc.text('Productos:', 20, 80);

    let y = 90;

    ticket.productos.forEach((item: any) => {
      doc.text(
        `• ${item.producto.nombre} - Cant: ${item.cantidad} - $${item.producto.precio}`,
        20,
        y
      );
      y += 10;
    });

    doc.text(`TOTAL: $${ticket.total}`, 20, y + 10);

    doc.save(`ticket-${ticket.id}.pdf`);
  }

  // -----------------------------------------
  // DESCARGAR PDF DESDE EL BACKEND (si lo genera el server)
  // -----------------------------------------
  descargarPDF(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/pdf/${id}`, {
      responseType: 'blob'
    });
  }
}
