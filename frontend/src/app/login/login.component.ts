import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.username.endsWith('@tecsup.edu.pe')) {
      console.log('Login:', this.username, this.password);
      // Redirige directamente al dashboard
      this.router.navigate(['/dashboard']);
    } else {
      console.error('Correo inválido. Debe ser @tecsup.edu.pe');
    }
  }
}
