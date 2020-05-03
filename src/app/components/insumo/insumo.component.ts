import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {InsumoModel} from '../../models/insumo.model';
import {InsumosService} from '../../services/insumos/insumos.service';
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {Observable} from 'rxjs';

// @ts-ignore
@Component({
  selector: 'app-insumo',
  templateUrl: './insumo.component.html',
  styleUrls: ['./insumo.component.css']
})
export class InsumoComponent implements OnInit {
  insumo: InsumoModel;
  modo: string;
  idx: number;

  constructor(private insumosService: InsumosService, private ar: ActivatedRoute) {
    this.insumo = new InsumoModel();
    this.ar.url.subscribe(params => {
      if ( params.length === 3) {
        this.modo = params[2].path;
      }
     });

    if (this.modo === 'edit'){
      this.ar.params.subscribe(params => {
        this.get(params.id);
      });
    }

  }
  ngOnInit(): void {
  }

  add(form: NgForm) {
    let peticion: Observable<any>;
    if (form.invalid){
      Object.values(form.controls).forEach( control => {
            control.markAsTouched();
        });
    }else{
      this.insumo.nombreInsumo = form.value.nombreInsumo;
      this.insumo.unidadMedida = Number(form.value.unidadMedida);
      this.insumo.disponibleMenu = Boolean(form.value.disponibleMenu);
      Swal.fire({
        title: 'Espere',
        text: 'Creando nuevo Insumo',
        icon: 'info'
      });
      Swal.showLoading();
      peticion = this.insumosService.add(this.insumo);
      peticion.subscribe(resp => {
        Swal.fire({
          title: 'Nuevo Insumo',
          text: 'Se creo nuevo Insumo',
          icon: 'success'
        });
        form.reset();
          });
    }
  }

  get(idx: number){
    this.insumosService.getById(idx)
        .subscribe((resp: InsumoModel) => this.insumo = resp);
  }

  update(form: NgForm) {
    let peticion: Observable<any>;
    this.insumo.nombreInsumo = form.value.nombreInsumo;
    this.insumo.unidadMedida = Number(form.value.unidadMedida);
    this.insumo.disponibleMenu = Boolean(form.value.disponibleMenu);
    Swal.fire({
      title: 'Espere',
      text: 'Actualizando Insumo',
      icon: 'info'
    });
    Swal.showLoading();
    peticion = this.insumosService.update(this.insumo, this.insumo.insumoId);
    peticion.subscribe(resp => {
      Swal.fire({
        title: this.insumo.nombreInsumo,
        text: 'Se actualizo Insumo',
        icon: 'success'
      });
    }, (error) => {
      Swal.fire({
        title: this.insumo.nombreInsumo,
        text: 'Error al Actualizar Insumo',
        icon: 'error'
      });
    });
  }
}
