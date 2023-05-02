import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Inscripcion } from '../inscripciones.component';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

// Subject
private estudiantes2$ = new Subject<Inscripcion[]>();

// BehaviorSubject
private estudiantes$ = new BehaviorSubject<Inscripcion[]>([
  {
    id: 1,
    nombre: 'Maria',
    apellido: 'Daza',
    nombre_curso: 'SQL',
    tutor: 'Profe Guille'
  },
  {
    id: 2,
    nombre: 'Jhon',
    apellido: 'Aguilar',
    nombre_curso: 'React',
    tutor: 'Profe Jose'
  },
  {
    id: 3,
    nombre: 'Martin',
    apellido: 'Gomez',
    nombre_curso: '.Net',
    tutor: 'Profe Andrea'
  },
])

constructor() { }

obtenerInscripcion(): Observable<Inscripcion[]> {
  return this.estudiantes$.asObservable();
}

obtenerInscripcionPorId(id: number): Observable<Inscripcion | undefined> {
  return this.estudiantes$.asObservable()
    .pipe(
      map((inscripciones) => inscripciones.find((a) => a.id === id))
    )
  }
}
