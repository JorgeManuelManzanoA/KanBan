import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { UsuariosService, Usuario } from '../../services/usuarios.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  usuarios: Usuario[] = [];
  searchTerm: string = '';
  filteredUsuarios: Usuario[] = [];
  showCreateUserModal = false;
  newUser: Usuario = { nombre: '', correo: '', contrasena: '', carrera: '', ciclo: '', seccion: '' };
  showPreviewModal: boolean = false;
  previewData: Usuario[] = [];
  isImporting: boolean = false; // Para manejar estado de importación

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
      this.buscarUsuarios();
    });
  }

  openCreateUserModal(): void {
    this.showCreateUserModal = true;
  }

  closeCreateUserModal(): void {
    this.showCreateUserModal = false;
  }

  registerUser(): void {
    this.usuariosService.createUsuario(this.newUser).subscribe((usuario) => {
      this.usuarios.push(usuario);
      this.newUser = { nombre: '', correo: '', contrasena: '', carrera: '', ciclo: '', seccion: '' };
      this.closeCreateUserModal();
      this.buscarUsuarios();
    });
  }

  buscarUsuarios(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsuarios = this.usuarios.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(term)
    );
  }

  exportarUsuarios(): void {
    const datos = this.usuarios.map((usuario) => ({
      Nombre: usuario.nombre,
      Correo: usuario.correo,
      Contraseña: usuario.contrasena,
      Carrera: usuario.carrera,
      Ciclo: usuario.ciclo,
      Sección: usuario.seccion,
    }));

    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
    XLSX.writeFile(workbook, 'usuarios.xlsx');
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      console.error('No se seleccionó ningún archivo.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const users: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      this.previewData = [];
      for (let i = 1; i < users.length; i++) {
        const row = users[i];

        if (row.length >= 6) {
          const user: Usuario = {
            nombre: row[0] || '',
            correo: row[1] || '',
            contrasena: row[2] || '',
            carrera: row[3] || '',
            ciclo: row[4] || '',
            seccion: row[5] || '',
          };
          this.previewData.push(user);
        } else {
          console.warn(`Fila ${i + 1} tiene menos de 6 columnas y fue omitida.`);
        }
      }

      if (this.previewData.length > 0) {
        this.showPreviewModal = true;
      } else {
        console.warn('No se encontraron datos válidos para importar.');
      }
    };

    reader.readAsArrayBuffer(file);
  }

  confirmarImportacion(): void {
    if (this.isImporting) return; // Evitar duplicación de procesos

    this.isImporting = true; // Bloquear múltiples envíos
    const failedRows: Usuario[] = [];

    // Usar Promises para manejar múltiples peticiones
    const importPromises = this.previewData.map((usuario) =>
      this.usuariosService.createUsuario(usuario).toPromise().catch((error) => {
        console.error('Error al guardar usuario:', usuario, error);
        failedRows.push(usuario); // Guardar los usuarios que fallaron
      })
    );

    Promise.all(importPromises).then(() => {
      this.isImporting = false;
      this.previewData = failedRows; // Mostrar los que fallaron, si hay
      this.showPreviewModal = false; // Cerrar modal si no hubo fallos
      if (failedRows.length > 0) {
        console.warn('Algunos usuarios no pudieron importarse:', failedRows);
      } else {
        this.cargarUsuarios(); // Recargar usuarios si todo fue exitoso
      }

      // Cerrar el modal de creación después de la importación
      this.closeCreateUserModal();
    });
  }

  cancelarImportacion(): void {
    this.previewData = [];
    this.showPreviewModal = false;
  }
}
