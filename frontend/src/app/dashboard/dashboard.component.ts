import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userRole: number = 0; // Guarda el rol del usuario -> numero entero

  constructor() {}

  ngOnInit(): void {
    // simlamos que el rol sera de un docente normal 
    this.userRole = 2;
  }

  getRoleDescription(role: number): string {
    switch (role) {
      case 1: return 'Docente Jefe';
      case 2: return 'Docente';
      case 3: return 'Alumno Líder';
      case 4: return 'Alumno';
      default: return 'Usuario';
    }
  }
}
