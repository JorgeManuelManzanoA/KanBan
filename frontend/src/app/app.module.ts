import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './dashboard/usuarios/usuarios.component';
import { ProyectosComponent } from './dashboard/proyectos/proyectos.component';
import { PerfilComponent } from './dashboard/perfil/perfil.component';
import { ConfiguracionComponent } from './dashboard/configuracion/configuracion.component';
import { LogoutComponent } from './dashboard/logout/logout.component';
import { InicioComponent } from './dashboard/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsuariosComponent,
    ProyectosComponent,
    PerfilComponent,
    ConfiguracionComponent,
    LogoutComponent,
    InicioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule, // Asegúrate de tener esto
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
