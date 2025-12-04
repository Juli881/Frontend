import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://localhost/api_proyecto/tickets';

  constructor(private http: HttpClient) { }

  obtenerTicket(idCompra: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idCompra}`);
  }

  descargarPDF(idCompra: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/descargar/${idCompra}`, { responseType: 'blob' });
  }

}

