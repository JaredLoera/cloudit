import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink,  RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-networks',
  imports: [ReactiveFormsModule,  RouterModule, CommonModule],
  templateUrl: './networks.html',
  styleUrl: './networks.css',
})
export class Networks implements OnInit {
signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      paquete: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      ubicacion: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  // Auto-selecciona el paquete y hace scroll al formulario
  selectPlan(planName: string): void {
    this.signupForm.patchValue({ paquete: planName });
    const formElement = document.getElementById('checkout-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
    //mostrar boton que diga desarrollado un alert
      window.alert('¡Gracias! Hemos recibido tu solicitud. Un asesor se comunicará contigo pronto.tamos desarrollado locuras tio!');
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      console.log('Datos de contratación:', this.signupForm.value);
      alert('¡Gracias! Hemos recibido tu solicitud. Un asesor se comunicará contigo pronto. tamos desarrollado locuras tio!');
      this.signupForm.reset();
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
