import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../servicios/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  ticket: any = null;
  cargando: boolean = true;

  constructor(private ticketService: TicketService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const idCompra = this.route.snapshot.params['id'];
    this.ticketService.obtenerTicket(idCompra).subscribe({
      next: (res) => {
        this.ticket = res;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  descargarPDF(): void {
    if (!this.ticket) return;
    this.ticketService.descargarPDF(this.ticket.id).subscribe({
      next: (res) => {
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ticket_${this.ticket.id}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    });
  }
}
