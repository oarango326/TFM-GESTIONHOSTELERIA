import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocalesService} from '../../services/locales/locales.service';
import {LocalModel} from '../../models/Local.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-local',
  templateUrl: './info-local.component.html',
  styleUrls: ['./info-local.component.css']
})
export class InfoLocalComponent implements OnInit {

  localParam: number;
  local: LocalModel;
  form: FormGroup;
  constructor(private route: ActivatedRoute, private localesService: LocalesService, private fb: FormBuilder) {
    this.route.parent.params.subscribe(params => {
      this.localParam = params.id;
    });

    this.crearFormulario();
    this.getLocal(this.localParam);
    this.cargarDataAlFormulario();

  }

  ngOnInit(): void {

  }

  get nombreNovalido(){
    return this.form.get('nombreLocal').invalid && this.form.get('nombreLocal').touched;
  }
  get direccionNovalido(){
    return this.form.get('direccionLocal').invalid && this.form.get('direccionLocal').touched;
  }
  get telefonoNovalido(){
    return this.form.get('telefonoLocal').invalid && this.form.get('telefonoLocal').touched;
  }


  getLocal(idx: number) {
    return this.localesService.getLocal(idx)
        .subscribe((resp: LocalModel) =>  this.local = resp);
    }

  crearFormulario(){
    this.form = this.fb.group({
      localId: [''],
      nombreLocal: ['', [Validators.required, Validators.minLength(5)]],
      direccionLocal: ['', Validators.required ],
      telefonoLocal: ['', [Validators.minLength(8), Validators.required]]
    });
  }

  guardar(){
    let peticion: Observable<any>;
    if (this.form.invalid){
      return Object.values(this.form.controls).forEach( control =>
       /* if (control instanceof FormGroup){
          Object.values(control.controls).forEach( (control) => control.markAllAsTouched());
        }else{*/
          control.markAsTouched()
       // }
      );
    }
    Swal.fire({
      title: 'Espere',
      text: 'Actualizando Local',
      icon: 'info'
    });
    Swal.showLoading();
    peticion = this.localesService.updateLocal(this.localParam, this.form.value);
    peticion.subscribe(resp => {
      Swal.fire({
        title: this.local.nombreLocal,
        text: 'Se actualizo Local',
        icon: 'success'
      });
    });
  }
  cargarDataAlFormulario() {
    console.log(this.local);
    this.form.reset({
      localId: '',
      nombreLocal: '',
      direccionLocal: '',
      telefonoLocal: ''
    });
  }
}
