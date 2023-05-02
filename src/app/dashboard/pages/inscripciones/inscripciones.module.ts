import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { AbmInscripcionesComponent } from './abm-inscripciones/abm-inscripciones.component';
import { InscripcionesDetalleComponent } from './pages/inscripciones-detalle/inscripciones-detalle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    InscripcionesComponent,
    AbmInscripcionesComponent,
    InscripcionesDetalleComponent, 
  ],
  imports: [
    CommonModule,
    CommonModule,
    MatTableModule,
    PipesModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: InscripcionesComponent
      },
      {
        path: ':id',
        component: InscripcionesDetalleComponent,
      }

    ])
  ], 
  exports: [
    InscripcionesComponent
  ]
})
export class InscripcionesModule { }
