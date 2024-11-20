import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Usuario {
  nombre: string;
  correo: string;
  contrasena: string;
  carrera: string;
  ciclo: string;
  seccion: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  // Obtener lista de usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener usuarios:', error);
        return throwError(() => error);
      })
    );
  }

  // Crear un nuevo usuario
  createUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<Usuario>(this.apiUrl, usuario, { headers }).pipe(
      catchError((error) => {
        console.error('Error al crear usuario:', error);
        return throwError(() => error);
      })
    );
  }
}
