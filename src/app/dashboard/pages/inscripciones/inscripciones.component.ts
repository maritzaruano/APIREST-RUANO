import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmInscripcionesComponent } from './abm-inscripciones/abm-inscripciones.component';
import { ActivatedRoute, Router } from '@angular/router';
import { InscripcionesService } from './services/inscripciones.service';


export interface Inscripcion {
  id: number;
  nombre: string;
  apellido: string;
  nombre_curso:string;
  tutor: string;

}


@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent {

  dataSource = new MatTableDataSource<Inscripcion>();

  displayedColumns: string[] = ['id', 'nombreCompleto', 'nombre_curso', 'tutor', 'ver_detalle', 'eliminar', 'editar'];

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private inscripcionesService: InscripcionesService,
  ) {
    this.inscripcionesService.obtenerInscripcion()
      .subscribe((inscripciones) => {
        this.dataSource.data = inscripciones;
      })
  }

  irAlDetalle(inscripcionId: number): void {
    this.router.navigate([inscripcionId], {
      relativeTo: this.activatedRoute,
    });
  }

  crearInscripcion(): void {
    const dialog = this.matDialog.open(AbmInscripcionesComponent)
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.dataSource.data = [
          ...this.dataSource.data,
          // AGREGANDO NUEVO ELEMENTO:
          {
            ...valor, // { nombre: 'xxxxxx', apellido: 'xxxxx' }
            id: this.dataSource.data.length + 1,
          }
        ];
      }
    })
  }


  eliminarInscripcion(inscripcionParaEliminar: Inscripcion): void {
    this.dataSource.data = this.dataSource.data.filter(
      (inscripcionActual) => inscripcionActual.id !== inscripcionParaEliminar.id,
    );
  }

  editarInscripcion(inscripcionParaEditar: Inscripcion): void {
    const dialog = this.matDialog.open(AbmInscripcionesComponent, {
      data: {
        inscripcionParaEditar
      }
    });
    dialog.afterClosed().subscribe((valorDelFormulario) => {
      if (valorDelFormulario) {
        this.dataSource.data = this.dataSource.data.map(
          (inscripcionActual) => inscripcionActual.id === inscripcionParaEditar.id
            ? ({ ...inscripcionActual, ...valorDelFormulario}) // { nombre: 'xxxxxx', apellido: 'xxxxx' }
            : inscripcionActual,
        );
      }
    })
  }
}