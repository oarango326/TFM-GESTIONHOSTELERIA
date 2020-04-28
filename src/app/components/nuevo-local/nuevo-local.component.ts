import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalModel} from '../../models/Local.model';
import {LocalesService} from '../../services/locales/locales.service';
import Swal from 'sweetalert2';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-nuevo-local',
  templateUrl: './nuevo-local.component.html',
  styleUrls: ['./nuevo-local.component.css']
})
export class NuevoLocalComponent implements OnInit {
  local = new LocalModel();
  form: FormGroup;
  @Output() recargaLocales: EventEmitter<void>;
  @Output() nuevoLocal: EventEmitter<void>;
  constructor(private fb: FormBuilder, private localesService: LocalesService) {
    this.crearFormulario();
    this.nuevoLocal = new EventEmitter<any>();
    this.recargaLocales = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }

  get nombreNovalido(){
    return this.form.get('nombreLocal').invalid && this.form.get('nombreLocal').touched;
  }

  crearFormulario(){
    this.form = this.fb.group({
      nombreLocal: ['', [Validators.required, Validators.minLength(5)]],
      direccionLocal: ['', Validators.required ],
      /* direccion: this.fb.group({
          direc: ['', Validators.required],
          municipio: ['', Validators.required]
      }),*/
      telefonoLocal: ['', [Validators.minLength(8), Validators.required]]
      // codigoPostal: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
    });
  }


  guardar(){
    let peticion: Observable<any>;
    if (this.form.invalid){
       return Object.values(this.form.controls).forEach( control => {
         if (control instanceof FormGroup){
           Object.values(control.controls).forEach( control =>  control.markAllAsTouched());
         }else{
           control.markAsTouched();
         }
      });
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando Nuevo Local',
      icon: 'info'
    });
    Swal.showLoading();
    peticion = this.localesService.addLocal(this.form.value);
    peticion.subscribe(resp => {
      Swal.fire({
        title: this.local.nombreLocal,
        text: 'Se Guardo Local',
        icon: 'success'
      });
    });
    this.form.reset();
  }

  volver() {
    this.nuevoLocal.emit();
    this.recargaLocales.emit();
  }
}
