import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import * as L from 'leaflet';


// Solución común para que Leaflet encuentre los iconos de los marcadores en Angular
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit, AfterViewInit {
  checkoutForm!: FormGroup;

  // Variables del Mapa
  private map!: L.Map;
  private marker!: L.Marker;
  currentLat: number = 25.5698; // Coordenadas iniciales (Gómez Palacio)
  currentLng: number = -103.4959;

  // Estado de la interfaz
  isProcessing: boolean = false;
  orderSuccess: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Inicializar el formulario con validaciones
    this.checkoutForm = this.fb.group({
      cp: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      numExt: ['', Validators.required],
      numInt: ['']
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([this.currentLat, this.currentLng], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.marker = L.marker([this.currentLat, this.currentLng], { draggable: true }).addTo(this.map);

    // Actualizar coordenadas cuando el usuario arrastra el pin
    this.marker.on('dragend', () => {
      const position = this.marker.getLatLng();
      this.currentLat = position.lat;
      this.currentLng = position.lng;
    });
  }

  // Se ejecuta al salir del campo del Código Postal (evento blur)
  onCpBlur(): void {
    const cp = this.checkoutForm.get('cp')?.value;
    if (cp && cp.length === 5) {
      // AQUÍ: Simulación de búsqueda. En producción, conectarías a una API de geolocalización.
      // Simulamos mover el mapa ligeramente en base al CP.
      this.currentLat = 25.5800 + (Math.random() * 0.05);
      this.currentLng = -103.4500 - (Math.random() * 0.05);

      this.map.flyTo([this.currentLat, this.currentLng], 15);
      this.marker.setLatLng([this.currentLat, this.currentLng]);
    }
  }

  procesarOrden(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.isProcessing = true;
    const formValues = this.checkoutForm.value;

    // A. CONSTRUIR EL JSON
    const ordenPayload = {
      planId: "plan_50mbps",
      planName: "50 Megas Asimétrico",
      monthlyPrice: 599.00,
      customerAddress: {
        postalCode: formValues.cp,
        neighborhood: formValues.colonia,
        street: formValues.calle,
        outdoorNumber: formValues.numExt,
        interiorNumber: formValues.numInt || null
      },
      installationCoordinates: {
        latitude: this.currentLat,
        longitude: this.currentLng
      },
      metadata: {
        source: "web_checkout_angular",
        requiresLOSCheck: true
      }
    };

    // B. Mostrar el JSON (Listo para mandar a tu API con HttpClient)
    console.log("🚀 JSON LISTO PARA ENVIAR AL BACKEND:");
    console.log(JSON.stringify(ordenPayload, null, 2));

    // Simular el tiempo de respuesta del servidor
    setTimeout(() => {
      this.isProcessing = false;
      this.orderSuccess = true;
      alert('Orden procesada. Revisa la consola para ver el JSON.');
    }, 1500);
  }
}
