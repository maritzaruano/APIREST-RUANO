import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-abm-inscripciones',
  templateUrl: './abm-inscripciones.component.html',
  styleUrls: ['./abm-inscripciones.component.scss']
})
export class AbmInscripcionesComponent {

  nombreControl = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]);
  apellidoControl = new FormControl('', [Validators.required,Validators.maxLength(50), Validators.minLength(3)]);
  nombre_cursoControl = new FormControl('', [Validators.required]);
  tutorControl = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]);



  inscripcionesForm = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    nombre_curso: this.nombre_cursoControl,
    tutor: this.tutorControl,

  });

  constructor(
    private dialogRef: MatDialogRef<AbmInscripcionesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    if (data) {
      this.nombreControl.setValue(data.inscripcionParaEditar.nombre);
      this.apellidoControl.setValue(data.inscripcionParaEditar.apellido);
      this.nombre_cursoControl.setValue(data.inscripcionParaEditar.nombre_curso);
      this.tutorControl.setValue(data.inscripcionParaEditar.tutor);
  

    }
  }


  guardar(): void {
    if (this.inscripcionesForm.valid) {
      this.dialogRef.close(this.inscripcionesForm.value)
    } else {
      this.inscripcionesForm.markAllAsTouched();
    }
  }
}


