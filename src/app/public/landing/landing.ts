import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  private fb = inject(FormBuilder);

  contactForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    mensaje: ['', [Validators.required, Validators.minLength(10)]]
  });

  onSendContact(): void {
    window.alert('¡Gracias! Hemos recibido tu solicitud. Un asesor se comunicará contigo pronto. tamos desarrollado locuras tio!');

    if (this.contactForm.valid) {
      console.log('Datos a enviar al backend:', this.contactForm.value);
      // Aquí invocas tu servicio HTTP para conectar con NestJS/Adonis/Laravel
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
  // Variable para controlar el estado del menú
  isMenuOpen: boolean = false;

  // Función para alternar el menú
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // ... (aquí va el resto de tu código, como el formulario de contacto)
}
