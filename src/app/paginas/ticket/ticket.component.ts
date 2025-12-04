import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../servicios/ticket.service';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  ticket: any = null;
  cargando: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.ticketService.obtenerTicket(id).subscribe({
      next: (data) => {
        this.ticket = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        alert('No se pudo cargar el ticket.');
      }
    });
  }

  descargarPDF() {
    if (!this.ticket) return;
    this.ticketService.generarPDF(this.ticket);
  }
}
