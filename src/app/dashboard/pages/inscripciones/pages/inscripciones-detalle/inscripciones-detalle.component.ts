import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InscripcionesService } from '../../services/inscripciones.service';
import { Inscripcion } from '../../inscripciones.component';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-inscripciones-detalle',
  templateUrl: './inscripciones-detalle.component.html',
  styleUrls: ['./inscripciones-detalle.component.scss']
})
export class InscripcionesDetalleComponent {
    inscripcion: Inscripcion | undefined;

  private destroyed$ = new Subject()

  constructor(
    private activatedRoute: ActivatedRoute,
    private inscripcionService: InscripcionesService,
  ) {
    this.inscripcionService.obtenerInscripcionPorId(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((inscripcion) => this.inscripcion = inscripcion);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}


